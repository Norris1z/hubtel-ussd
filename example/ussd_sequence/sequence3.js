const hubtel = require('hubtel-ussd');
const Response = hubtel.Response;
const ResponseTypes =hubtel.ResponseTypes;

class Sequence3{
    async handle(ussdRequest){
        let ussdResponse = new Response();
        switch (ussdRequest.message) {
            case '1':
                ussdResponse.message = `Thank you. You will receive your free ${ussdRequest.clientState} shortly.`;
                break;
            case '2':
                ussdResponse.message = 'Order cancelled.';
                break;
            default:
                ussdResponse.message = 'Invalid selection.';
                break;
        }
        ussdResponse.type = ResponseTypes.release;
        return ussdResponse;
    }
}

module.exports = Sequence3;