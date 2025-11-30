# Dependency Injection

> "DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself"

- DI is a pattern where your classes don't create their own dependencies, they receive them from the framework

```ts
// instead of
class UserController {
  private service = new UserService(); // BAD (tight coupling)
}

// you do
class UserController {
  // the framework creates the UserService instance and injects it into UserController
  constructor(private readonly service: UserService) {} // good
}
```

## Dependency injection in Angular

- https://www.youtube.com/watch?v=G8zXugcYd7o
