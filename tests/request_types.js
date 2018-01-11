const should = require('chai').should();
let ResponseTypes = require('../index').ResponseTypes;

describe("USSDRequest Types tests",function(){
    it("Should throw an error when it is re-assigned",function(){
        'use strict';
        should.throw(()=>{ ResponseTypes.response = 'something else'});
        should.throw(()=>{ ResponseTypes.release = 'something new'});
    });
});
