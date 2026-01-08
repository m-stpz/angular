import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { Product } from '../types/product.type';

@Injectable()
export class ProductsService {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async findAll(): Promise<Product[]> {
    const snap = await this.db.collection('products').get();
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
  }

  async findOne(id: string): Promise<Product | null> {
    const doc = await this.db.collection('products').doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as Product) : null;
  }

  // async createProduct(data: any) {
  //   const ref = await this.db.collection('products').add({
  //     ...data,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   return { id: ref.id };
  // }
}
