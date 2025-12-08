import 'reflect-metadata';
import * as admin from 'firebase-admin';

// Load service account however you prefer
// (JSON import, fs read, or env vars)
import * as serviceAccount from '../config/firebase.config.json';
import { Product } from '../types/product.type';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

async function seedProducts() {
  const products: Omit<Product, 'id'>[] = [
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling Bluetooth headphones.',
      price: 199,
      image: '/images/headphones.png',
      stripePriceId: 'price_123456',
      isFeatured: true,
      orderItem: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      name: 'Gaming Mouse',
      description: 'High-precision optical gaming mouse.',
      price: 79,
      image: '/images/mouse.png',
      stripePriceId: 'price_789012',
      isFeatured: false,
      orderItem: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  for (const product of products) {
    const ref = await db.collection('products').add(product);
    console.log(`Created product ${product.name} → ID: ${ref.id}`);
  }

  process.exit(0);
}

seedProducts().catch((err) => {
  console.error(err);
  process.exit(1);
});
