# Angular/Firebase architecture

## Overview

- This is called Clean Architecture for Enterprise Angular or Layered Reactive Architecture

Component -> Store -> API Service -> Cloud function -> Services -> Repo -> DB

| Layer          | Responsibility                       | Pattern name             |
| -------------- | ------------------------------------ | ------------------------ |
| Component      | Rendering UI / User input            | Presenter                |
| Store          | Component-specific / UI logic        | ComponentStore           |
| API Service    | Request formatting / dispatching     | Gateway                  |
| Cloud function | Security / auth / routing            | Controller               |
| Service layer  | Business logic / rules / validations | Domain service           |
| Repository     | firestore path building / CRUD       | Data access object (DAO) |

> Outer layers can see inner layers, but inner layers should never see outer layers

- The component (outer) can see the store (inner)
- The store (inner) should never know which component is using it

### Part 1: The frontend

- Layer 1: component
- Layer 2: store
- Layer 3: the API service

1. Component layer (UI)
   - Renders UI
   - Handlers user interactions
   - Validates form

```ts
this._store.onSubmit(...)
```

2. Store layer (State management)
   - Manages component state
   - Orchestrates RxJS effects
   - Calls API service

```ts
await this._apiService.submitData(...)
```

3. API Service Layer (Frontend -> Backend bridge)
   - Wraps Firebase callable functions
   - Single point of contact to backend

### Part 2: The backend

- Layer 4: Cloud functions
- Layer 5: Services

4. Cloud Function (Backend entry point)
   - Validates authentication
   - Handles errors
   - Routes to business logic

5. Service Layer (Business logic)
   - Validates input data
   - Applies business rules
   - Updates data models
   - Triggers notifications/activity logs

6. Repository layer (Data access)
   - Abstracts firestore operations
   - Provides CRUD methods
   - Type-safe data access

### Part 3: The db (firestore)

- Layer 7: Data structure

7. Firebase/firestore (Database)
   - Stores document data
   - Triggers real-time updates
   - Enforces security rules

## Part 1. The frontend

### Layer 1: component (`.component.ts`)

- The presenter
- Handles user input and displays the `vm$`

```ts
@Component({
  selector: "wd-feature-name",
  providers: [FeatureStore],
  template: `<ng-container *ngIf="vm$ | async as vm">...</ng-container>`,
})
export class FeatureComponent extends BaseComponent implements OnInit {
  private readonly _store = inject(FeatureStore);
  readonly vm$ = this._store.vm$;

  ngOnInit() {
    this._store.initData();
  }

  onAction(data: SomeData) {
    if (this.form.valid) {
      this._store.processAction(data);
    }
  }
}
```

### Layer 2: The store (`.store.ts`)

- The local memory
- Manages the local UI state and triggers side effect

```ts
@Injectable()
export class FeatureStore extends ComponentStore<FeatureStae> {
  private readonly _api = inject(ApiService);

  // 1. selectors (slices)
  readonly data$ = this.select((s) => s.data);

  // 2. ViewModel (object of view)
  readonly vm$ = this.select(this.state$, (state) => ({ ...state }));

  // 3. effect (brigde to API)
  readonly processAction = this.effect<any>((origin$) =>
    origin$.pipe(
      tap(() => this.patchState({ loading: true })),
      concatMap((val) => this._api.performCall(val)),
      tap(() => this.patchState({ loading: false })),
    ),
  );
}
```

### Layer 3: The API service `api.service.ts`

- The messenger
- Converts TS methods into backend calls
- Wraps firebase `httpsCallable` or HTTP client

```ts
@Injectable({ providedIn: "root" })
export class ApiService {
  private _functions = inject(Functions);

  // generic wrapper for security/logging
  private async call(action: string, data: any) {
    const fn = httpsCallable(this._functions, "apiCall");
    const result = await callable({ action, data });
    return result.data;

    // return (await fn({ action, data })).data;
  }

  doSomething(payload: any) {
    return this.call("doSomething", payload);
  }
}
```

## Part 2. The backend

### Layer 4: The entry point to cloud functions `index.ts`

- The security guard
- Validates auth and routes to logic

```ts
export const featureFunction = async (data: any, context: CallableRequest) => {
  const auth = Container.get(AuthService).setContext(context);

  if (!auth.isAuthenticated()) {
    throw new HttpsError("unauthenticated", "stop!");
  }

  return await Container.get(FeatureUtilsService).execute(data);
};
```

### Layer 5: The business logic service `.service.ts`

- The brain
- applies rules, updates models, triggers logs

```ts
@Service()
export class FeatureUtilsService {
  async execute(data: any) {
    const repo = Container.get(FeatureRepository);
    const existing = await repo.get({ orgId: data.orgId, id: data.id });

    const updatedData = { ...existing, status: "DONE" };

    await Promise.all([
      repo.update(updatedData, ["status"]),
      this.notifyUsers(data.orgId),
      this.logicActivity("Feature updated"),
    ]);
  }
}
```

### Layer 6: The repository (`.repository.ts`)

- The librarian
- Abstracts database paths and provides CRUD
- Uses "Path properties" instead of hardcoded strings

```ts
export class FeatureRepository extends DataRepository<FeatureModel, PathProps> {
  constructor(dataservice: DataService) {
    super(FeatureModel, FeaturePathBuilder, dataservice);
  }

  // inherits: get(), find(), watch(), create(), update(), delete()
}
```

## Part 3. The db

- The memory
- Document-based storage
- Multi-tenancy via `/organizations/{orgId}/...` paths
