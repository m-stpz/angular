# GraphQL

1. Schema: The contract between client and server

- Defines types, fields, and relationships

```graphql
type User {
  id: ID!
  name: String!
  posts: [Post!]
}
```

2. Queries: Read operations. The client asks exactly for the fields it needs

```graphql
query {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}
```

3. Mutations: Write operations (create/update/delele). Always returns the shape the client defines

```graphql
mutation {
  createUser(name: "Mateus") {
    id
    name
  }
}
```

## GraphQL vs. REST

| Concept       | Rest                                              | GraphQL                                                                   |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| Data fetching | Fixed endpoints -> tends to over or underfetch    | Client picks fields -> avoids payload bloat                               |
| Structure     | URL maps to a resource (`users/1/posts`)          | Schema maps to a graph of types, not URLs                                 |
| Versioning    | Often versioned `v1`, `v2`                        | Avoids versions; evolve the schema by adding fields, deprecating old ones |
| Performance   | Multiple round-trips for nested data              | Single round-trip, but watch out for N+1 resolver issues                  |
| Caching       | Native browser + CDN caching works out of the box | Harder at the HTTP level; solutions shift to the client                   |
| Flexibility   | Server decides the response shape                 | Client decides response shape                                             |
| Tooling       | Postman, Bruno                                    | GraphiQL, Apollo, introspection-driven tooling                            |
