# NoSQL Databases

## Why NoSQL?

### 1. More scalable

- NoSQL scale out, not up
- Data is automatically sharded across nodes
- Massive read/write throughput without redesign the system
- Great for: global, distributed, mobile, or IoT workloads
- SQL can scale horizontally, but it's complex and usually requites custom sharding logic

### 2. Flexible schema

- No predefined schema, fields can evolve gradually
- Faster iterations on features
- No migrations blocking deployments
- Easy to store dynamic / user-generated structures
- Good for early-stage products or systems, where the data requirements evolve

## 3. High-Volume reads/writes

- NoSQL engines (Firestore, Dynamodb, Cassandra) prioritize performance
- Low-latency read/write
- Distributed write handling
- No JOIN overhead
- Good for fast, predictable response times at scale

## Concepts

### 1. Schema-less (but structured) data

- NoSQL dbs don't enforce a fixed schema
  - You add whatever fields you need per document
  - This gives flexibility, but demands discipline to avoid messy/unreliable data
- Firestore: collections -> documents -> fields

### 2. Document-oriented model

- Data is stored as documents (JSON-like), grouped into collections
- Each document is independent record and can contain nested data
- Why it matters:
  - Reads return whole documents
  - Writes update documents atomically
  - No table joins

### 3. Denormalization

- Model data for queries, not for relationships
- Instead of joining, you duplicate data across documents to optimize reads
- Example:
  - Store user info inside each post document
  - Trade-off: you need to manually handle updates if the user changes their name
