# Store Angular

- Single source of truth
- Avoid prop drilling
- If data is changed in one place, every component, which uses it, is updated
- Store = client-side db that lives in the browser's memory

## 1. Legacy: NgRx (Redux Pattern)

- Follows Redux pattern: actions, reducers, and selectors

### 1.1 Workflow

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

### 1.2 The definitions (state & action)

- Define:
  - what data looks like
  - what "events" can happen

```ts
import { createAction, props, createReducer, on, createSelector } from "@ngrx/store";

// 1. state interface
export interface UserState {
  profile: Profile | null;
  loading: boolean;
}

// 2. actions -> the events
export const loadUser = createAction("[User] load", props<{ id: string }>());
export const loadUserSuccess = createAction("[User] success", props<{ data: Profile }>());
```

### 1.3 The logic (reducers & selectors)

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
