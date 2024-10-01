export interface PaymentGateway {
    processPayment(amount: number): Promise<boolean>;
  }