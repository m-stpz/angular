import { OrderItem } from './order-item.type';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stripePriceId: string;
  isFeatured: boolean;
  orderItem: OrderItem[];
  createdAt: number;
  updatedAt: number;
};
