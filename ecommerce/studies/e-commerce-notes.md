# Ecommerce

## Architecture

![alt text](e-commerce-architecture.png)

## Steps

### Video 1: https://www.youtube.com/watch?v=E1wtzB0ZSgQ&t

#### 1. Setup Nx workspace

```bash
npm add --global nx
```

### 2. Create a NestJS application in the workspace

- https://nx.dev/docs/technologies/node/nest/introduction

```bash
npx create-nx-workspace@latest
nx add @nx/nest
nx g @nx/nest:app apps/<name>
nx serve <name>
# nx serve backend
```

```
root -> where nx is located
    apps
        backend -> where nestjs is
```

### 3. Setup firestore

1. Install firebase admin and generate the module

```bash
pnpm install firebase-admin
nest generate module firebase
```

2. Setup `firebase.module`

```ts
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
```

3. Inject the firestore in any service

```ts
import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class UsersService {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async findAll() {
    const snapshot = await this.db.collection('users').get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async create(data: any) {
    const ref = await this.db.collection('users').add(data);
    return { id: ref.id };
  }
}
```

4. Import module in AppModule

```ts
import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [FirebaseModule],
})
export class AppModule {}
```

### 4. Connect NestJS app to firestore

### 5. Add GraphQL to NestJS

== Possible steps ==

3. Add GraphQL to NestJS
4. Connect NestJS app to firestore
5. Add a seed command to create products in DB
6. Create the frontend (Angular)
7. Setup Angular material/SDK
8. Add NgRx signal store & create ProductsStore
9. Add angular-apollo for GraphQL queries
10. Implement getting products API call
