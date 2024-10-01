import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { EmailService } from './email.service';
import { UserRepository } from './repositories/user.repository';
import { OrderRepository } from './repositories/order.repository';
import { PaypalPaymentGateway } from './gateways/paypal.gateway';
import { StripePaymentGateway } from './gateways/stripe.gateway';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderService,
    EmailService,
    // Repositories
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    // Payment gateways
    {
      provide: 'IPaymentGateway',
      useFactory: () => {
        // You can implement logic here if you want to inject the correct payment gateway.
        // For now, it's defaulting to PaypalPaymentGateway. In real scenarios, this would depend on the user's choice.
        return new PaypalPaymentGateway();
      },
    },
    PaypalPaymentGateway,
    StripePaymentGateway,
  ],
})
export class OrderModule {}