export class PaypalPaymentGateway implements IPaymentGateway {
    async processPayment(amount: number): Promise<boolean> {
      // Logic to process PayPal payment
      return true;
    }
  }