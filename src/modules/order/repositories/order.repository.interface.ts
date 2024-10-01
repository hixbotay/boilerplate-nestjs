export interface IOrderRepository {
    createOrder(order: Order): Promise<Order>;
  }