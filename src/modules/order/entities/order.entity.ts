export class OrderEntity {
    constructor(
      public readonly id: number,
      public readonly userId: number,
      public readonly items: OrderItem[],
      public readonly totalAmount: number
    ) {}
  }