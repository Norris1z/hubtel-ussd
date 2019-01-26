const hubtel = require('hubtel-ussd');
const Response = hubtel.Response;
const ResponseTypes =hubtel.ResponseTypes;

class Sequence1{
    async handle(ussdRequest){
        return new Response('Welcome to Freebie Service.\n1. Free Food\n2. Free Drink\n3. Free Airtime',ResponseTypes.response);
    }
}

module.exports = Sequence1;