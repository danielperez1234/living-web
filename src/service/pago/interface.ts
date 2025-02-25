export interface PostPayment {
  token:     string;
  sessionId: string;
}
export interface ResponsePayment {
  status:        string;
  transactionId: string;
  amount:        number;
  description:   string;
}
