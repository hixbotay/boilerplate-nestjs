@Injectable()
export class EmailService {
  async sendOrderConfirmation(email: string, order: Order): Promise<void> {
    // Logic to send email confirmation
  }
}