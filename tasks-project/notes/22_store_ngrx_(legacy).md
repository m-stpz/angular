## Legacy: NgRx (Redux Pattern)

- Follows Redux pattern: actions, reducers, and selectors

### 1 Overview

- Action: unique event (e.g., `[UserPage] Load Data`)
  - state/action: intent
- Effect: "invisible" listener that sees the Action and fetches data from API
  - the api call
- Reducer: pure function that takes the API data and "updates" the state
  - the logic
- Selector: Specialized function that components use to "slice" the data they need from the store
  - the data access

- In NgRx store, state is immutable
  - Never change it, return a new one

```ts
// ❌
state.user = "Bob";

// ✅
return { ...state, user: "Bob" };
```

### 2 The definitions (state & action)

- Define:
  - what data looks like
  - what "events" can happen

```ts
import { createAction, props, createReducer, on, createSelector } from "@ngrx/store";

//  state interface
export interface UserState {
  profile: Profile | null;
  loading: boolean;
}

// 2. actions -> the events
export const loadUser = createAction("[User] load", props<{ id: string }>());
export const loadUserSuccess = createAction("[User] success", props<{ data: Profile }>());
```

### 3 The logic (reducers & selectors)

- Reducer: decides how the state changes
- Selector: helps components grab the portion/slice they need

```ts
// 3. Reducer -> decision-maker
const initialState: UserSate = { profile: null, loading: false };

export const userReducere = createReducer(
  initialState,
  on(loadUser, (state) => ({ ...state, loading: true })),
  on(loadUserSucess, (state, { data }) => ({ ...state, profile: data, loading: false })),
);

// 4. selectors -> the slicers
export const selectUserState = (state: Profile) => state.user;
export const selectProfile = createSelector(selectUserState, (state) => state.profile);
```

### 4 The side-effect

- They watch for the `action`, go to the database/api, and then "dispatch" a success action

```ts
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";

@Injectable()
export class UserEffect {
  private actions$ = inject(Actions);
  private api = inject(ApiService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap((action) => this.api.getUser(action.id).pipe(map((data) => loadUserSuccess({ data })))),
    ),
  );
}
```

### 5 The component (usage)

```ts
@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
        <div *ngIf-"user$ | async as user">
            {{user | json}}
        </div>
    `,
})
export class ProfileComponent {
  private store = inject(Store);

  // use selector to get data
  users$ = this.store.select(selectProfile);
}
```
