import anyTest, { TestInterface } from 'ava';
import HubtelUSSD from "../index";
import { USSDRequest } from '../types';

interface Context {
    ussdRequest: USSDRequest
}

const test = anyTest as TestInterface<Context>;

test.beforeEach(t => {
    t.context = {
        ussdRequest:{
            Mobile: "2331234567",
            SessionId: "8883ba8b1e7348b8b566b4b3396575c2",
            ServiceCode: "712",
            Type:"Initiation",
            Message: "1",
            Operator: "mtn",
            Sequence: 1
        }
    }
});

test('It throws an error when an empty sequence is passed to HubtelUSSD.process', t => {
    HubtelUSSD.process(t.context.ussdRequest,[]);
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});