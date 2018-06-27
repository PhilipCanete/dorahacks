import web:wq
from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse
import twilio
from twilio.rest import Client

app = Flask(__name__)

@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming texts with a simple text message."""
    # Start our TwiML response
    resp = strSplit(MessagingResponse())

if(resp[0]){
	if resp[0] == "deposit":i
		wallet = resp[1]		
		r=requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
		resp.message("Attempting to deposit NAS")


	if resp[0] == "send":
		sender = resp[1]
		reciever = resp[2]
		amount = resp[3]
		r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase", data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
		resp.message("Attempting to send NAS")


if resp[0] == "balance":
		wallet = resp[1]
		r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
		resp.message("Displaying balance")

		
if resp[0] == "add"
		key = resp[1] 
		wallet = resp[2]
		balance = resp[3]
		r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
		resp.message("Adding" + key + "to friends list")


if resp[0] == "remove"		#Also sends back remaining NAS
                key = resp[1]
                r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
		resp.message("Removing "+ key + "from friends list")
		}
	
    return str(resp)
urls = (
    '/', 'index'
)

class index:
    def GET(phone,message):
        account_sid = 'ACa05677c7d842c319c57df5997af4e7b4'
	auth_token = '##########################'
	client = Client(account_sid, auth_token)

	message = client.messages.create(
                              body=message,
                              from_='+15555555555', #NAS SMS Wallet number
                              to=phone
                          )


if __name__ == "__main__":
    app = web.application(urls, globals())
f(resp[0]){
        if resp[0] == "deposit":i
                wallet = resp[1]
                r=requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
                resp.message("Attempting to deposit NAS")


        if resp[0] == "send":
                sender = resp[1]
                reciever = resp[2]
                amount = resp[3]
                r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase", data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
                resp.message("Attempting to send NAS")


if resp[0] == "balance":
                wallet = resp[1]
                r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
                resp.message("Displaying balance")


if resp[0] == "add"
                key = resp[1]
                wallet = resp[2]
                balance = resp[3]
                r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
                resp.message("Adding" + key + "to friends list")


if resp[0] == "remove"          #Also sends back remaining NAS
                key = resp[1]
                r.requests.post("http://localhost:8685/v1/admin/transactionWithPassphrase",data={"transaction":{"from":"n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS","to":"n1rVLTRxQEXscTgThmbTnn2NqdWFEKwpYUM", "value":"100","nonce":1,"gasPrice":"1000000","gasLimit":"2000000","contract":{"function":"save","args":"[0]"}}, "passphrase": "passphrase"})
                resp.message("Removing "+ key + "from friends list")
                }

    return str(resp)
urls = (
    '/', 'index'
)

class index:
    def GET(phone,message):
        account_sid = 'ACa05677c7d842c319c57df5997af4e7b4'
        auth_token = '##########################'
        client = Client(account_sid, auth_token)

        message = client.messages.create(
                              body=message,
                              from_='+15555555555', #NAS SMS Wallet number
                              to=phone
                          )


if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
