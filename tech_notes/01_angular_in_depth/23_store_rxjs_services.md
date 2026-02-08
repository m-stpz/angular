# RxJS Services

- Before the industry moved to signals, many "modern" apps opted for simpler Observable Service pattern, also known as data service pattern
- Provides 80% of NgRx benefits with 20% of the code

```ts
@Injectable({ providedIn: "root" })
export class UserStore {
  // 1. private source of truth
  private userState = new BehaviorSubject<User | null>(null);

  // 2. the public "stream" components listen to
  users$ = this.userState.asObservable();

  // 3. method to update it
  setUser(user: User) {
    this.userState.next(user);
  }
}
```
