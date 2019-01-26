'use strict';

const ResponseTypes = {
    response: 'Response',
    release: 'Release'
}

Object.freeze(ResponseTypes);

class HubtelUSSDRequest{
    constructor(mobile = null,sessionId = null,serviceCode = null,type = null
    ,message = null,operator = null,sequence = null,clientState = null){
        this._mobile = mobile;
        this._sessionId = sessionId;
        this._serviceCode = serviceCode;
        this._type = type;
        this._message = message;
        this._operator = operator;
        this._sequence = sequence;
        this._clientState = clientState;
    }

    get mobile(){
        return this._mobile;
    }

    get sessionId(){
        return this._sessionId;
    }

    get serviceCode(){
        return this._serviceCode;
    }

    get type(){
        return this._type;
    }

    get message(){
        return this._message;
    }

    get operator(){
        return this._operator;
    }

    get sequence(){
        return this._sequence;
    }

    get clientState(){
        return this._clientState;
    }

    set mobile(mobile){
        this._mobile = mobile;
    }

    set sessionId(sessionId){
        this._sessionId = sessionId;
    }

    set serviceCode(serviceCode){
        this._serviceCode = serviceCode;
    }

    set type(type){
        this._type = type;
    }

    set message(message){
        this._message = message;
    }

    set operator(operator){
        this._operator = operator;
    }

    set sequence(sequence){
        this._sequence = sequence;
    }

    set clientState(clientState){
        this._clientState = clientState;
    }
}

class HubtelUSSDResponse{
    constructor(_message = null,_type = null,_clientState=null){
        this.Message = _message;
        this.Type = _type;
        this.ClientState = _clientState;
    }

    get message(){
        return this.Message;
    }

    get type(){
        return this.Type;
    }

    get clientState(){
        return this.ClientState;
    }

    set message(message){
        this.Message = message;
    }

    set type(type){
        this.Type = type;
    }

    set clientState(clientState){
        this.ClientState = clientState;
    }
}

class HubtelUSSD{
    async process(HubtelRequest,Sequences){
         if(! HubtelRequest instanceof HubtelUSSDRequest) throw new Error("First parameter passed to HubtelUSSD.process must be an instance of HubtelUSSDRequest");
         if(!Array.isArray(Sequences)) throw new Error("HubtelUSSD.process requires second parameter to be array");
         if(Sequences.length === 0) throw new Error("Second parameter passed to HubtelUSSD.process cannot be empty");
         
         let sequence = HubtelRequest.sequence - 1;
         if(Sequences[sequence] === undefined) return new HubtelUSSDResponse('Sorry!. Something went wrong',ResponseTypes.release);
         let newInstance = new Sequences[sequence];
         if(newInstance.handle === undefined) throw new Error(`All Sequences passed to Hubtel.process must have a 'handle' method. Check Sequence '${newInstance.constructor.name}'`);
         let response = await newInstance.handle(HubtelRequest);
         if(!(response instanceof HubtelUSSDResponse)) throw new Error("All Sequences must return an Instance of HubtelUSSDResponse");
         
         return response;
     }
}

exports = module.exports = HubtelUSSD;
exports.Request = HubtelUSSDRequest;
exports.Response = HubtelUSSDResponse;
exports.ResponseTypes = ResponseTypes;
