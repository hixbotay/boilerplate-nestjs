import { Injectable } from '@nestjs/common';
import { IUserRepository } from './repositories/user.repository';
import { IOrderRepository } from './repositories/order.repository';
import { IPaymentGateway } from './gateways/payment.gateway';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly paymentGateway: IPaymentGateway,
    private readonly emailService: EmailService
  ) {}

  async createOrder(email: string, items: OrderItem[], paymentType: string): Promise<Order> {
    let user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      user = await this.userRepository.createUser(email);
    }

    const totalAmount = this.calculateTotal(items);
    const paymentGateway = this.getPaymentGateway(paymentType);

    const paymentSuccess = await paymentGateway.processPayment(totalAmount);
    if (!paymentSuccess) {
      throw new Error('Payment failed');
    }

    const order = new Order(Date.now(), user.id, items, totalAmount);
    const createdOrder = await this.orderRepository.createOrder(order);

    await this.emailService.sendOrderConfirmation(user.email, createdOrder);
    return createdOrder;
  }

  private calculateTotal(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  private getPaymentGateway(paymentType: string): IPaymentGateway {
    // Factory pattern to choose payment gateway based on the type
    if (paymentType === 'paypal') {
      return new PaypalPaymentGateway();
    } else if (paymentType === 'stripe') {
      return new StripePaymentGateway();
    }
    throw new Error('Unsupported payment type');
  }
}
