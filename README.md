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
<b>parameters: </b>

  type   - Optional parameter specifying if deck should be "FULL" (default) or "SHORT". <br/>
  shuffled   - Optional parameter specifying if deck should be "FULL" (default) or "SHORT". <br/>


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

 {"type":"SHORT",
 "shuffled":true,
 "cards":[
 {"value":"10","suite":"DIAMONDS","code":"10D","_id":"62388b30857efa4cae63cd2e"},            {"value":"10","suite":"CLUBS","code":"10C","_id":"62388b30857efa4cae63cd1c"},{"value":"6","suite":"CLUBS","code":"6C","_id":"62388b30857efa4cae63cd18"}],"deckID":"62388b30857efa4cae63cd0d","remaining":3
 }

