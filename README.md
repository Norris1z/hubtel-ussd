# Hubtel USSD

Based on [Hubtel's USSD API](https://developers.hubtel.com/reference#ussd)

## About

This package helps you to build maintainable and scalable USSD applications by breaking down your "long switch" statement USSD application into modules

## Getting Started

Check out [this link](https://developers.hubtel.com/docs/getting-started-with-ussd) to know how you can acquire a USSD code from Hubtel.

### Installing

Install the package from `npm`

```
npm install --save hubtel-ussd
```

### Usage
Check the [example](https://github.com/Norris1z/hubtel-ussd/blob/master/example) folder for an example using expressjs

```js
  //app.js 
const Hubtel = require('hubtel-ussd');
const HubtelUSSD = new Hubtel();
const HubtelRequest = Hubtel.Request;

//setup CORS
const cors = require('cors');

app.use(cors());

//route which serves as the endpoint to your ussd application
app.post('/', async(req, res) => {
  // we use underscorejs to convert the request body to an array and use the spread operator
  let request = new HubtelRequest(... _(req.body).toArray());
  
  /**
    * Pass the instance of the HubtelRequest (request) as the first parameter to HubtelUSSD.process
    * create a folder for our sequences
    * and require the seqeunces into an array as the second parameter for HubtelUSSD.process
    **/
    let ussdResponse = await HubtelUSSD.process(request,[
        require('./my_sequence_dir/sequence1'),
        require('./my_sequence_dir/sequence2'),
        require('./my_sequence_dir/sequence3')
    ]);
    res.json(ussdResponse);
});
});
```

Done :blush:

### Api
`ResponseTypes` is an object with two properties `response` and `release` for indicating the type of response in a sequence.

```js
  const hubtel = require('hubtel-ussd');
  const ResponseTypes =hubtel.ResponseTypes;
  
  ResponseTypes.response  // 'Response'
  ResponseTypes.release // 'Release'
```

`HubtelUSSD` is a class with one method `process` which takes two parameters a `Request (an instance of HubtelUSSDReqeust)` and
an `array` of `sequence`;

```js
  const Hubtel = require('hubtel-ussd');
  const HubtelUSSD = new Hubtel();
  const HubtelRequest = Hubtel.Request;
  
  let request = new HubtelRequest(/** populate properties **/);
  let response = await HubtelUSSD.process(request,[/** an array of sequence **/);
  //response is an instance of HubtelUSSDResponse
  
```

All `seqeunces` must have a `handle` method and must return an instance of `HubtelUSSDResponse (Response)`.
The package automagically injects a `ussdRequest` parameter into the `handle` method of each `sequence`. This `ussdRequest` is an 
instace of `HubtelUSSDRequest` which grants access to all properties and methods in the `request`.

```js
//sequence1.js
const hubtel = require('hubtel-ussd');
const Response = hubtel.Response;
const ResponseTypes = hubtel.ResponseTypes;

class Sequence1{
    /*
     * A ussdRequest object which is an instance of HubtelUSSDRequest
     *  this gives us access to methods such as {mobile,sessionId,serviceCode,type} etc 
     **/
    async handle(ussdRequest){
        //ussdRequest.mobile --- returns the mobile number of the user performing the request. etc
        return new Response('Welcome to Freebie Service.\n1. Free Food\n2. Free Drink\n3. Free Airtime',ResponseTypes.response);
    }
}

module.exports = Sequence1;
```

Visit [Hubtel's USSD Api documentation page](https://developers.hubtel.com/documentations/ussd-api) for the list of methods on the request 
and response classes
## Running the tests

`npm test`

## Authors

* **Norris Oduro** - [Norris1z](https://github.com/Norris1z)

## License

This project is licensed under the MIT License
