# REST API example application


## Install
npm install --save 


## Run the app
npm start

Configuration is in /config/global.tx . 


## Run the tests

    ./run-tests.sh

## Create a new DECK

### Request

`POST /deck/` 
<br/>
#parameters: 

  "type"   - Optional parameter specifying if deck should be "FULL" (default) or "SHORT". <br/>
  "shuffled"   - Optional parameter specifying if deck should be "FULL" (default) or "SHORT". <br/>


### Response
{
    "type": "SHORT",
    "shuffled": false,
    "deckID": "623877a663240b1c1746d25c",
    "remaining": 36
}



## Get a specific Deck

### Request

`GET /deck/:id`

   

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

