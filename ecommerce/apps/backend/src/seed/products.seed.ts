import 'reflect-metadata';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../config/firebase.config.json';
import { products } from './products.config';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

async function seedProducts() {
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
