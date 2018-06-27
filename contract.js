o, what does this script do? Simply put, it acts as a bank. Lets say for example, you want a savings account. Instead of setting up a seperate wallet, you can use a deployed smart contract like this one to "hold" your funds. The only person who can collect the stored funds via this smart contract is the original address holder. The bank can also hold funds until a certain block height is reached.
This original contract is located at https://github.com/nebulasio/wiki/blob/master/tutorials/%5BEnglish%5D%20Nebulas%20101%20-%2003%20Smart%20Contracts%20JavaScript.md
*/

'use strict';// Type of execution mode - This is used via the v8 javascript execution. This should always be strict. This should also be a double quoted string. "use strict";

var DepositeContent = function (text) {//The function to deposit funds
  if (text) {//If the variable "text" exists, do the following
    var o = JSON.parse(text);//Convert the string (JSON Format) into a object called "o"
    this.balance = new BigNumber(o.balance);//o obj balance to balance
    this.expiryHeight = new BigNumber(o.expiryHeight);//o obj expiryHeight to expiryHeight
  } else {// If (text) not true, do the following
    this.balance = new BigNumber(0);//Set balance to 0 using the built-in function BigNumber
    this.expiryHeight = new BigNumber(0);//Set expiryHeight to 0 using the built-in function BigNumber
  }
};

DepositeContent.prototype = {//Define DepositeContent as a (prototype) object
  toString: function () {//Convert our smart contract source code to a string (e.g. this document)
    return JSON.stringify(this);//Converts the previous toString to a JSON string(array)
  }
};

var BankVaultContract = function () {//Create the function BankVaultContract
//The follwing is a bit tricky. Let's break it down further
  LocalContractStorage.defineMapProperty(this, "bankVault", //LocalContractStorage and defineMapProperty are built-in functions in Nebulas. 
  //You can use defineMapProperty to accept numbers, strings and JavaScript objects in string format. Only the contract that stores this data can access and manipulate it.
	  {
		parse: function (text) {//Convert the previous command into a object
		  return new DepositeContent(text);//returns result
		},
		stringify: function (o) {// Converts object o (from func DepositeContent)  into a string 
		  return o.toString();//returns result
		}
	  }
	);
};


// save value to contract, only after height of block, users can withdraw. - From original tutorial
/* What this line is saying is that we can define how many blocks we need to wait to withdraw the funds. 
For example, if you want to lock them up for a week (7 days), you need to wait ~2,520 blocks. 
Why ~2,520? Nebulas currently mines one block approximatly every 15 seconds or 4 per minute on average and there are 10080 minutes in a week.
10080/4=2,520
You must also keep in mind that the seconds per block can vary but should average every 15 seconds.
*/

BankVaultContract.prototype = {//Define BankVaultContract function as a (prototype) object
  init: function () {//Initilizer function - this is needed in all Nebulas Smart Contracts. 
  },
  save: function () {//Define the save function
    var height = 1;
    var from = Blockchain.transaction.from;//Get the from address. Blockchain is a built in function with different objects associated with this function (e.g. transaction.from). 
    var value = Blockchain.transaction.value;//Get the value of the tx
    var bk_height = new BigNumber(Blockchain.block.height);//Return the block height of the chain as a BigNumber(built in function)

    var orig_deposit = this.bankVault.get(from);//Get the previous balance submitted to the bankVault
    if (orig_deposit) {//Check to see if there was a previous balance
      value = value.plus(orig_deposit.balance);//If so, add the new transaction value to the existing balance. Keep the variable as "value"
    }
    var deposit = new DepositeContent();//Define new object deposit
    deposit.balance = value; //Set deposit value
    deposit.expiryHeight = 1;//Set the height of expiration ??
	console.log ("TESTING: func: save | val deposit.expiryHeight= "+deposit.expiryHeight);//NEW Logging Line
    this.bankVault.put(from, deposit);//Add the deposit into the vault. Track vault values using the "from" variable
  },

  takeout: function (value) {//Define the takeout function
    var from = Blockchain.transaction.from;//Get the from address. Blockchain is a built in function with different objects associated with this function (e.g. transaction.from). 
    var bk_height = new BigNumber(Blockchain.block.height);//Return the block height of the chain as a BigNumber(built in function)
    var amount = new BigNumber(value);//Define how much we are taking out of the contract. Converting value into a BigNumber

    var deposit = this.bankVault.get(from);//Get the current deposit value (total)
    if (!deposit) {//If there is no previous deposits, throw a error.
      throw new Error("No deposit before.");//This error will be returned to the person submitting the TX
    }

    if (bk_height.lt(deposit.expiryHeight)) {//Verivy that the block height is less than the expiryHeight. The .lt function is part of the BigNumber class and means isLessThan.
	  console.log ("TESTING: func: takeout | val deposit.expiryHeight= "+deposit.expiryHeight);//NEW Logging Line
	  throw new Error("Can not takeout before expiryHeight.");//The expiry height has not been reached. Trow error and display it
	  //This error will be returned to the person submitting the TX
	  //If you wanted to display the needed block height for withdrawal, the line should look like this:
	  // throw new Error("Can not takeout before expiryHeight: "+deposit.expiryHeight);
    }

    if (amount.gt(deposit.balance)) {//The amount - gt must be part of the BigNumber function //If there is not enough funds being held in the contract from the requester address, throw error.
	  console.log ("TESTING: func: takeout | val deposit.balance= "+deposit.balance);//NEW Logging Line
	  throw new Error("Insufficient balance."); //This error will be returned to the person submitting the TX
	}

    var result = Blockchain.transfer(from, amount);//We pass all the error checks and we can now initiate a transfer using the built-in fuction Blockchain(transfer)
    if (!result) {//If the previous command did not return a result, throw a error. I am unsure why this would throw a error. Probably a just-in-case call
      throw new Error("transfer failed.");//This error will be returned to the person submitting the TX
    }
	console.log ("TESTING: func: takeout | val result= "+result);//NEW Logging Line - Made it past all the possible error points.

    Event.Trigger("BankVault", {//We are triggering a event. Calling the function Bankvault with a transfer request 
	Transfer: {//Calling Transfer in function BankVault
        from: Blockchain.transaction.to,//Set from address - this is the smart contract address
        to: from,//set to address - this is the address that made the request
        value: amount.toString()//How much are we transfering
      }
    });

    deposit.balance = deposit.balance.sub(amount);//Deposit funds from a user.
	console.log ("TESTING: func: takeout | val deposit.balance= "+deposit.balance);//NEW Logging Line

    this.bankVault.put(from, deposit);//Call function bankVault.put
  },
  balanceOf: function () {//Check the balance of the smart contract via the requested address
    var from = Blockchain.transaction.from;//Set the from address - This is how the contract stores the funds values.
	console.log ("TESTING: func: balanceOf | val this.bankVault.get(from)= "+this.bankVault.get(from));//NEW Logging Line
    return this.bankVault.get(from);//return the value of the requester address.
  },
  verifyAddress: function (address) {//Check if the address is verified.
    // A returned value of 1 is a valid address.
	// A returned value of 0 is a invalid address.
    var result = Blockchain.verifyAddress(address);// Check if the address is valid using the built in function Blockchain.verifyAddress
	console.log ("TESTING: func: verifyAddress | val result= "+result);//NEW Logging Line
    return {//Return 1 or 0 if the address pending on the results of the previous line.
      valid: result == 0 ? false : true//Convert it from true/false instead of 1/0
    };
  },

  send: function (name, value) {//Define the takeout function
    var from = LocalContractStorage.get(name);//Get the from address. Blockchain is a built in function with different objects associated with this function (e.g. transaction.from). 
    var amount = new BigNumber(value);//Define how much we are taking out of the contract. Converting value into a BigNumber
    var deposit = this.bankVault.get(from);//Get the current deposit value (total)


    if (amount.gt(deposit.balance)) {//The amount - gt must be part of the BigNumber function //If there is not enough funds being held in the contract from the requester address, throw error.
	  console.log ("TESTING: func: takeout | val deposit.balance= "+deposit.balance);//NEW Logging Line
	  throw new Error("Insufficient balance."); //This error will be returned to the person submitting the TX
	}

    var result = Blockchain.transfer(from, amount);//We pass all the error checks and we can now initiate a transfer using the built-in fuction Blockchain(transfer)
    if (!result) {//If the previous command did not return a result, throw a error. I am unsure why this would throw a error. Probably a just-in-case call
      throw new Error("transfer failed.");//This error will be returned to the person submitting the TX
    }
	console.log ("TESTING: func: takeout | val result= "+result);//NEW Logging Line - Made it past all the possible error points.

    Event.Trigger("BankVault", {//We are triggering a event. Calling the function Bankvault with a transfer request 
	Transfer: {//Calling Transfer in function BankVault
        from: Blockchain.transaction.to,//Set from address - this is the smart contract address
        to: from,//set to address - this is the address that made the request
        value: amount.toString()//How much are we transfering
      }
    });
    
    deposit.balance = deposit.balance.sub(amount);//Deposit funds from a user.
	console.log ("TESTING: func: takeout | val deposit.balance= "+deposit.balance);//NEW Logging Line

    this.bankVault.put(from, deposit);//Call function bankVault.put
  },


  //Database stuff
    set: function (name, value) {
        // Storing a string
        LocalContractStorage.set("name",name);
        // Storing a number (value)
        LocalContractStorage.set("value", value);
        // Storing an objects
        LocalContractStorage.set("obj", {name:name, value:value});
        console.log("Added friend");
    },
    get: function () {
        var name = LocalContractStorage.get("name");
        console.log("name:" + name)
        var value = LocalContractStorage.get("value");
        console.log("value:" + value)
        var obj = LocalContractStorage.get("obj");
        console.log("obj:" + JSON.stringify(obj))
    },
    del: function () {
        var result = LocalContractStorage.del("name");
        console.log("del result:" + result)
    },

};
module.exports = BankVaultContract;//Export the smart contract using the built in function module.exports.
