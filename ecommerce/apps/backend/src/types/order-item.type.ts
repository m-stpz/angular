import { Product } from './product.type';

type OrderStatus = 'pending' | 'started-delivery' | 'delivered';

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  paymentId: string;
  createdAt: number;
  updatedAt: number;
};

export type OrderItem = {
  id: string;
  orderId: Order['id'];
  productId: Product['id'];
  quantity: number;
  price: number;

  // snapshot (historically accurate, but not kept in sync)
  productName?: Product['name'];
  productPriceAtPurchase?: Product['price'];
};
