# Dependency Injection

> "DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself"

- DI is a pattern where your classes don't create their own dependencies, they receive them from the framework
- It's a way to decouple object creation from its usage

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

```ts
class UserService {
  sayHi() {
    console.log("hi");
  }
}

@Component({
  selector: "app-your",
  templateUrls: "./your.component.html",
  styleUrls: ["./your.component.scss"],
})
export class YourComponent {
  // we pass the UserService as an argument in the constructor
  constructor(private user: UserService) {}

  doSomething() {
    this.user.getData();
  }
}

// Angular DI
class Injector {
  private _container = new Map();

  constructor(private _providers: unknown[] = []) {
    this._providers.forEach((service) =>
      this._container.set(service, new service())
    );
  }

  get(service: unknown) {
    const serviceInstance = this._container.get(service);

    if (!serviceInstance) {
      throw new Error("no service found");
    }

    return serviceInstance;
  }
}

// somewhere in application
const injector = new Injector([UserService]);
const component = new Component(injector.get(UserService));
component.user.sayHi();
```

- Angular does the magic above under the hood on compilation time
- The framework creates the `UserService` instance and injects it into `UserController`

### Injector

- Responsible for creation of a class instance and inject it into constructor of the object

```ts
const userDependency = new UserService();
return new YourComponent(userService);
```

#### Injectors hierarchy & resolution rules

- Model Injector

## DI in React (analogy)

- Non-DI: Component creates its own deps
- The component instantiates what it needs. This couples it tightly with implementation

```jsx
// non-DI
function UserProfile() {
  const service = new UserService(); // hard-coded deps
}

// DI: Inject via props
function UserProfile({userService}) {
    ...
}

// parent
<UserProfile userService={new UserService()}/>
```
