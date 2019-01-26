import { USSDRequest, USSDSequence, USSDResponse } from "./types";

class HubtelUSSD{
    async process(request:USSDRequest,sequences:Array<USSDSequence>):Promise<USSDResponse>{
        if (sequences.length === 0){
             throw new Error("Second parameter passed to HubtelUSSD.process cannot be empty");
         } 
         
        let sequence = request.Sequence - 1;
        if (sequences[sequence] === undefined){
             const errorResponse: USSDResponse = { Message: "Sorry!. Something went wrong",Type:"Release" }; 
             return errorResponse;
         } 
         
        return sequences[sequence].handle(request);
     }
}

export default new HubtelUSSD();