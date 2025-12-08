import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class ProductsService {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async createProduct(data: any) {
    const ref = await this.db.collection('products').add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { id: ref.id };
  }
}
