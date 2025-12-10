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

#### Result

```ts
export type Product = {
  id: string;
  name: string;
  ...
  // orderItem: OrderItem[]; => no orderItem inside it
};


export type Order = {
  id: string;
  status: OrderStatus;
  ...
  // items?: OrderItem[]; => items is removed, no items array inside the order
  // orderItems are fetched via `orderId` query
};

export type OrderItem = {
  id: string;
  ...
  orderId: Order['id']; // reference to order
  ...
  // product: Product; // remove the product
  productId: string; // reference to product

// order: Order; // instead of order, you write some "shallow" information on write-time
// denormalized snapshopts
  productName:string;
  productImage: string;
  productPriceAtPurchase: number;
};
```

##### Queries

- Get Order -> OrderItems

```ts
const items = await db
  .collection("orderItems")
  .where("orderId", "==", orderId)
  .get();
```

- Get OrderItem -> Product:
  - You can fetch it, but not needed if using denormalized fields

```ts
const product = await db.collection("products").doc(orderItem.productId).get();
```

- Get all orders for a user

```ts
db.collection("orders").where("userId", "==", userId);
```

## Snapshots | Denormalization

- Prevent extra reads -> no need to fetch product for every item
- Preserve historical accuracy
- Copy some fields from a related document into another document at write time, instead of looking them up every time you read
- In SQL:
  - Store data once
  - Join tables to get combined info
- In NoSQL:
  - No joins
  - Related data is often stored multiple times, locally where needed
- Firestore is optimized for reads -> it's cheaper to duplicate a few fields than to perform extra network queries
- By its definition this snapshots can introduce stale/outdated data
  - In NoSQL, data becomes stale by design unless you decide to keep it in sync
  - You must decide, field by field, where the stale data is acceptable or not

### Types of data: Immutable / Historical vs. Mutable, Dynamic

- Immutable historical data is fine to become "stale", snapshots are great for it
- Mutable, Dynamic data, snapshots must be kept in sync
  - For this, snapshots shouldn't be used, instead, store the id and always fetch fresh data

### How to deal with denormalization? | 3 Strategies

- 1. Don't store snapshots at all
  - Store an id and always fetch fresh data
  - More reads, but no stale data
- 2. Store snapshots, but sync certain fields
  - When something happens, run a background function, for instance
  - No more stale data, but more writes
  - Only you need consistency that's a path
- 3. Allow snapshots to be stale (by design)
  - Data that remain historically accurate to the point in history it was written
  - The most common and correct usage of snaphots

## How to model relational relations into NoSQL

### 1:1 (One-to-One)

#### Pattern 1: Embed

- Use when the data is small and always fetched together

```
users/{userId} {
  name,
  email,
  profile: {
    bio,
    avatar,
    location
  }
}
```

- Pros:
  - fewer reads, simpler
- Cons:
  - large documents if profile grows
  - profile kind of "depends" on user and user needs to maintain extra information that otherwise wouldn't be needed

#### Pattern 2: Reference

- Related data becomes more indepedennt
- Good for: optional, large, or updated indepedently data sets

```
users/{userId}
profiles/{userId}
```

- Then, we store only the ID of the profile

```
users/{userId}{
  profileId:"123"
}
```

### 1:N (One-to-Many)

#### Pattern 1: Flat (Recommended)

- Store children in top-level collections wih a foreign key

```
users/{userId}
orders/{orderId} {
  userId: "1234",
  ...
}
```

```ts
// query
orders.where("userId", "==", userId);
```

#### Pattern B: Subcollection

- When children always belongs to one parent and you always fetch them via the parent

```
users/{userId}/orders/{orderId}
```

### N:N (Many-to-Many)

- You create an explicit link

#### Pattern 1: Linking collection (best general solution)

```
user_product_favorites/{linkId} {
  userId,
  productId
}
```

- Lookups:
  - All user favorites: filter by userId
  - All users who have favorited something: filter by productId
