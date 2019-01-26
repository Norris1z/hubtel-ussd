export type USSDRequestType = "Initiation" | "Response" | "Release" | "Timeout";

export type USSDResponseType = "Response" | "Release";

export interface USSDRequest {
  Mobile: string;
  SessionId: string;
  ServiceCode: string;
  Type: USSDRequestType;
  Message: string;
  Operator: string;
  Sequence: number;
  ClientState?: string;
}

export interface USSDResponse {
  Message: string;
  Type: USSDResponseType;
  ClientState?: string;
  MaskNextRoute?: boolean;
}

export interface USSDSequence {
  handle(request: USSDRequest): Promise<USSDResponse>;
}
