nx monorepo

- frontend: Angular
- ui lib: Angular material/CDK
- platform layer - >firebase: hosting + infra + db

  - hosting
  - serverless compute
  - database
  - file storage

- backend layer -> nestjs / fastify
- api protocol -> graphql
- backend/services:
  - firebase hosting + functions + firestore/storage
  - hono for APIs
  - Apollo client on the frontend
  - nestJS/fastify
- data layer: direct firestore SDK
