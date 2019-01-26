const hubtel = require('hubtel-ussd');
const Response = hubtel.Response;
const ResponseTypes =hubtel.ResponseTypes;

class Sequence2{
    async handle(ussdRequest){
        let ussdResponse = new Response();
        const items = { 1: 'food', 2: 'drink', 3: 'airtime' };

        if (ussdRequest.message in items) {
            ussdResponse.message = `Are you sure you want free ${items[ussdRequest.message]}?\n1. Yes\n2. No`;
            ussdResponse.type = ResponseTypes.response;
            ussdResponse.clientState = items[ussdRequest.message];
        } else {
            ussdResponse.message = 'Invalid option.';
            ussdResponse.type = ResponseTypes.response;
        }
        return ussdResponse;
    }
}

module.exports = Sequence2;