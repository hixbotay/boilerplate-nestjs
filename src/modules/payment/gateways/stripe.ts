export class StripePaymentGateway implements IPaymentGateway {
    async processPayment(amount: number): Promise<boolean> {
      // Logic to process Stripe payment
      return true;
    }
  }