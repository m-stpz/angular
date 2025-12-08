import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as firebaseConfig from '../config/firebase.config.json';

const firebase = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

const FirestoreDB = firebase.firestore();

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
