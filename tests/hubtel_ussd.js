let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let hubtel = require('../index');
let Request = hubtel.Request;
let Response = hubtel.Response;
let ResponseTypes = hubtel.ResponseTypes;


describe("HubtelUSSD tests",function(){
    let HubtelUSSD;
    let HubtelRequest;
    beforeEach(()=>{
         HubtelUSSD = new hubtel();
         HubtelRequest = new Request();
    });

    it("Throws an error when the first parameter passed to process is not an instance of HubtelUSSDRequest",function(){
        should.throw(()=>{HubtelUSSD.process({},[])});
        should.not.throw(()=>{HubtelUSSD.process(HubtelRequest,[""])});
    });
    
    it("Throws an error when second parameter to process is not an array",function(){
        should.throw(()=>{HubtelUSSD.process(HubtelRequest,"i am causing an error")});
        should.not.throw(()=>{HubtelUSSD.process(HubtelRequest,[""])});
    });
    
    it("Throws an error when second parameter passed to process is an empty array",function(){
        should.throw(()=>{HubtelUSSD.process(HubtelRequest,[])});
        should.not.throw(()=>{HubtelUSSD.process(HubtelRequest,[""])});
    });
    
    it("Returns a HubtelUSSDResponse when the sequence is invalid",function(){
        let response = HubtelUSSD.process(HubtelRequest,["i am an invalid sequence"]);
        assert.strictEqual(true,response instanceof Response);
        assert.equal(response.message,'Sorry!. Something went wrong');
        assert.equal(response.type,ResponseTypes.release);
        assert.strictEqual(response.clientState,null);
    });
    
    it("Throws an error when sequence passed does not have a handle method",function(){
        let ConstructedHubtelRequest = new Request("2331234567","8883ba8b1e7348b8b566b4b3396575c2",
        "712","Initiation","1","mtn","1","hello Norris"); 
        let mySequence = class{
            eat(){
                return "I'm eating";
            }
            sayHi(){
                return "Hello Joshua";
            }
        };
        should.throw(()=>{HubtelUSSD.process(ConstructedHubtelRequest,[mySequence])});

        let myGoodSequence =class{
            handle(ussdRequest){
                return new Response("Hello JabClari",ResponseTypes.release);
            }
        }
        should.not.throw(()=>{HubtelUSSD.process(ConstructedHubtelRequest,[myGoodSequence])});
    });

    it("Throws an error if the response from the call to process is not an instance of HubtelUSSDResponse",function(){
        let ConstructedHubtelRequest = new Request("2331234567","8883ba8b1e7348b8b566b4b3396575c2",
        "712","Initiation","1","mtn","1","hello Norris"); 
        let Initial = class{
            handle(ussdRequest){
                return {message:"Hello JabClari",type:ResponseTypes.release};
            }
        }
        should.throw(()=>{HubtelUSSD.process(ConstructedHubtelRequest,[Initial])});
        let Second = class{
            handle(ussdRequest){
                return new Response("Hello JabClari",ResponseTypes.release);
            }
        }
        should.not.throw(()=>{HubtelUSSD.process(ConstructedHubtelRequest,[Second])});
    });

    it("Returns a response",function(){
        let ConstructedHubtelRequest = new Request("2331234567","8883ba8b1e7348b8b566b4b3396575c2",
        "712","Initiation","1","mtn","1","hello Norris"); 
        let sequence = class{
            handle(ussdRequest){
                return new Response("Hello JabClari",ResponseTypes.release);
            }
        }
        let response = HubtelUSSD.process(ConstructedHubtelRequest,[sequence]);
        assert.equal(response.message,'Hello JabClari');
        assert.equal(response.type,ResponseTypes.release);
        assert.equal(response.clientState,null);
    });
});