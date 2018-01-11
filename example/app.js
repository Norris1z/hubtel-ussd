const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const _ = require('underscore');
/**
 * Require hubtel-ussd
 */
const Hubtel = require('hubtel-ussd');
const HubtelUSSD = new Hubtel();
const HubtelRequest = Hubtel.Request;

app.use(bodyParser.json());


app.post('/', (req, res) => {

    /**
     *  We convert the body of the request to an array using underscore (_(object).toArray())
     * and use the spred operator to unpack it to the constructor of the HubtelUSSDRequest class
     * (HubtelRequest)
     * */
    let request = new HubtelRequest(... _(req.body).toArray());

    let ussdResponse = HubtelUSSD.process(request,[
        require('./ussd_sequence/sequence1'),
        require('./ussd_sequence/sequence2'),
        require('./ussd_sequence/sequence3')
    ]);
    res.json(ussdResponse);
});

app.listen(8000);
