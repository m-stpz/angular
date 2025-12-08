import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_API_KEY,
  }),
});

export const FirestoreDB = firebase.firestore();

@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useValue: FirestoreDB,
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {}
