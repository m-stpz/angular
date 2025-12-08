import { Product } from './product.type';

type OrderStatus = 'pending' | 'started-delivery' | 'delivered';

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  paymentId: number;
  items?: OrderItem[];
  createdAt: number;
  updatedAt: number;
};

export type OrderItem = {
  id: string;
  orderId: Order['id'];
  productId: number;
  quantity: number;
  price: number;
  order: Order;
  product: Product;
};
