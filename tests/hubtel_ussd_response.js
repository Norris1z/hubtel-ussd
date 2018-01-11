const assert = require('chai').assert;
let hubtel = require('../index');
let Response = hubtel.Response;
let ResponseTypes = hubtel.ResponseTypes;

describe("HubtelUSSDResponse tests",function(){
    it("It default constructs all properties to null",function(){
        let HubtelResponse = new Response();
    
        assert.equal(HubtelResponse.message,null);
        assert.equal(HubtelResponse.type,null);
        assert.equal(HubtelResponse.clientState,null);
    });
    
    it("Default constructs Response from the constructor",function(){
        let HubtelResponse = new Response("Welcome JabClari",ResponseTypes.response,"JabClari");
    
        assert.equal(HubtelResponse.message,"Welcome JabClari");
        assert.equal(HubtelResponse.type,ResponseTypes.response);
        assert.equal(HubtelResponse.clientState,"JabClari");
    });
    
    it("Constructs Response using setter methods",function(){
        let HubtelResponse = new Response();
        HubtelResponse.message = "Welcome JabClari";
        HubtelResponse.type = ResponseTypes.response;
        HubtelResponse.clientState = "JabClari";
    
        assert.equal(HubtelResponse.message,"Welcome JabClari");
        assert.equal(HubtelResponse.type,ResponseTypes.response);
        assert.equal(HubtelResponse.clientState,"JabClari");
    });
});
