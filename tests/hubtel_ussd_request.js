const assert = require('chai').assert;
let Request = require('../index').Request;

describe("HubtelUSSDRequest tests",function(){
    it("It default constructs all properties to null",function(){
        let HubtelRequest = new Request();
    
        assert.equal(HubtelRequest.mobile,null);
        assert.equal(HubtelRequest.sessionId,null);
        assert.equal(HubtelRequest.serviceCode,null);
        assert.equal(HubtelRequest.type,null);
        assert.equal(HubtelRequest.message,null);
        assert.equal(HubtelRequest.operator,null);
        assert.equal(HubtelRequest.sequence,null);
        assert.equal(HubtelRequest.clientState,null);
    });
    
    it("Default constructs Request from the constructor",function(){
        let HubtelRequest = new Request("2331234567","8883ba8b1e7348b8b566b4b3396575c2",
        "712","Initiation","1","mtn","1","hello Norris");
    
        assert.equal(HubtelRequest.mobile,"2331234567");
        assert.equal(HubtelRequest.sessionId,"8883ba8b1e7348b8b566b4b3396575c2");
        assert.equal(HubtelRequest.serviceCode,"712");
        assert.equal(HubtelRequest.type,"Initiation");
        assert.equal(HubtelRequest.message,"1");
        assert.equal(HubtelRequest.operator,"mtn");
        assert.equal(HubtelRequest.sequence,"1");
        assert.equal(HubtelRequest.clientState,"hello Norris");
    });
    
    it("Constructs Requests using setter methods",function(){
        let HubtelRequest = new Request();
        HubtelRequest.mobile = "2331234567";
        HubtelRequest.sessionId = "8883ba8b1e7348b8b566b4b3396575c2";
        HubtelRequest.serviceCode = "712";
        HubtelRequest.type = "Initiation";
        HubtelRequest.message = "1";
        HubtelRequest.operator = "mtn";
        HubtelRequest.sequence = "1";
        HubtelRequest.clientState = "hello Norris";
    
        assert.equal(HubtelRequest.mobile,"2331234567");
        assert.equal(HubtelRequest.sessionId,"8883ba8b1e7348b8b566b4b3396575c2");
        assert.equal(HubtelRequest.serviceCode,"712");
        assert.equal(HubtelRequest.type,"Initiation");
        assert.equal(HubtelRequest.message,"1");
        assert.equal(HubtelRequest.operator,"mtn");
        assert.equal(HubtelRequest.sequence,"1");
        assert.equal(HubtelRequest.clientState,"hello Norris");
    });
});
