# Angular Services

- A service is a TS class that holds:
  - business logic
  - data logic
  - API calls
  - shared state
  - reusable functions

Services is logic, not UI (container/smart component)

```bash
ng g service services/<service>
```

- They are meant to be injected into components
- They can either be injected in the component, or globally

```ts
@Injectable({
    providedIn:"root" // makes it global
    // if we want to be localized in only the components we import it, we remove this
})
```

1. Creating a service

```js
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root", // means this service is a singleton app-wide
})
export class UserService {
  getUser() {
    return { name: "Mateus", age: 29 };
  }
}
```

2. Using a service in a component

- Ng injects deps via the constructor

```js
// private varName:Class
constructor(private userService: UserService){
    ngOnInit(){
        const user = this.userService.getUser()
        // do something
    }
}
```

## 1. When to use them?

- API Calls
- shared data between components
- logic reused in multiple components
- state not tied to the view
- business rules

It's not UI and used multiple times? -> put in in a service

## 2. Ng HTTPClient - making API Calls

- Built-in HTTP client

```js
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class UserService {
    constructor(private http:HttpClient){}

    getUsers(){
        return this.http.get<User[]>("/api/users")
    }
}
```

> Every HTTP method returnd an Observable

- Using it in a component

```js
users$ = this.userService.getUsers();
```

```html
<div *ngIf="users$ | async as users">
  <div *ngFor="let user of users">{{user.name}}</div>
</div>
```

### HTTP Methods in angular

```ts
this.http.get<User[]>("/api/users");
this.http.post("/api/users", { name: "John" });
this.http.put("/api/users/1", { name: "Updated" });
this.http.patch("/api/users/1", { age: 29 });
this.http.delete("/api/users/1");
```

```ts
@Injectable({ providedIn: "root" })
export class ProductService {
  private baseUrl = "/api/products";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: Product["id"]) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: Product) {
    return this.http.post(this.baseUrl, product);
  }

  update(id: Product["id"], product: Partial<Product>) {
    return this.http.patch(`${this.baseUrl}/${id}`, product);
  }

  delete(id: Product["id"]) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
```

### Observables

- Stream of values over time

  - Promise that can emit multiple values, not just one

- A Promise gives you one value later
- An Observable gives you many values over time
