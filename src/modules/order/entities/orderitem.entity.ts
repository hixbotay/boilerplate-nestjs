export class OrderItemEntity {
    constructor(
      public readonly productId: number,
      public readonly quantity: number,
      public readonly price: number
    ) {}
  }