# NoSQL Databases

## Why NoSQL?

- Relational databases are great for consistency, but bad for:
  - scaling
  - resource intensiveness
- SQL scales vertically, not horizontally
- NoSQL
  - Does away with relationships
  - Every item stays on its own

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

### 4. Index-driven queries

- Queries depend on indexes. No index = no query
- Firestore auto-indexes simple fields, but needs manula indexes for compound queries
- Design rule: Think about how you'll query before defining the structure

### 5. Eventual consistency

- Many NoSQL systems aren't strongly consistent
- Firestore has strong consistency for document reads/writes, but eventual consistency for some distributed queries

## Example

Let's say you have:

### Relational database

```ts
export type Product = {
  id: string;
  name: string;
  ...
  orderItem: OrderItem[];
};


export type Order = {
  id: string;
  status: OrderStatus;
  ...
  items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  ...
  orderId: Order['id'];
  order: Order;
  product: Product;
};
```

- Here,

  - a product can have multiple orderItems
  - an order, multiple order items
  - an order item belongs to order and product

- For NoSQL, the models are restructured around queries and data locality

### Non-relational database

1. Flatten the structure

- Collections become top-level

```
orders
orderItems
products
```

2. Remove circular references

- Never store full objects inside other objects
- Store only the IDs needed for queries

```
orders/{orderId}{
  id,
  userId,
  status,
  ... => no relation to orderId
}

orderItems/{orderItemId}{
  id,
  orderId => only store the id
}
```

### How to model relational relations into NoSQL

#### 1:1
