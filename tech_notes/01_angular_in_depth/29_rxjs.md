# RxJS

- RxJS (Reactive Extensions for JS) is a powerful, open-source library for reactive programming
  - It simplifies composing async, event-based code
  - It uses observable sequences
  - Reactive Programming + Observables
- RxJS is the backbone of the entire framework

- To understand it, think of variables as "pipes" where values flow over time, instead of "boxes" holding a value
  - Standard variable: `x = 5` -> snapshot in time
  - Observable: `x$` -> a stream that now is 5, in 1 minute, 10, in an hour `Error`

## Concepts

### Observables: the data source

- They represent a stream of data over time
- It needs to be subscribed to do something

## Subscriptions: the consumer of the data

- They represent the execution of an Observable, crucial for managing the lifecycle and canceling async tasks
- The **act of listening** to an Observable
  - html: `| async` pipe
  - ts: `subscribe()`

### HTML `| async` pipe

- Automatic way to listen to an Observable
- If we find ourselves writing `.subscribe()` inside the component's ts just to get the data onto the screen, likely `| async` pipe would be enough
- Ideally, we keep the logic in the store and the display on the html. Preferably, we skip `subscribe()` on the component's body

```html
<div *ngIf="user$ | async as user; else loading">...</div>

<ng-template #loading></ng-template>
```

### TS `.subscribe()`

- Manual way to listen
- Use this when you need to perform logic in the background

```ts
export class UserDetailComponent implements OnInit, onDestroy {
  private _userSub?: Subcription;
  user: User | null = null;

  private userService = inject(UserService);

  ngOnInit() {
    // subscribe to the observable
    this._userSub = this.userService.user$.subscribe((userData) => {
      this.user = userData;
      console.log("new data arrived", userData);
    });
  }

  ngOnDestroy() {
    this._userSub?.unsubscribe();
  }
}
```

- We should move subscription here when we need to **trigger a secondary action**, a side-effect, that the HTML can't handle

#### When we don't need it

```ts
readonly user$ = this._store.select(s => s.user) // we don't need an extra user local variable
// we should let the pipe handle it
```

```html
<div *ngIf="user$ | async as user">...</div>
```

#### When we need it

- After something happened, we need to perform another operation
- HTML can't "close a dialog" or "navigate", then we need to listen to the stream result in the ts

```ts
ngOnInit(){
    // subscribe because we WANT TO DO SOMETHING WITH THE RESULT
    this._store.saveResults$.pipe(
        takeUntil(this._destroy$) // clean up
    ).subscribe((sucess) => {
        if (success) {
            this._toast.show("success")
            this._dialogRef.close() // logic the html can't perform
        }
    })
}
```

## Operators: the transformer

- Pure functions that enable functional programming to manipulate data, such as `map`, `filter`, `concat`, and `reduce`
- They allow us to change the data as it moves through the pipe

## Subjects: the multi-caster

- A special type of Observable that allows values to be multicasted to many Observers
- It can both emit and listen to data
  - This is what powers `BehaviorSubject` on the store

## Observers

- collection of callbacks that listen to values delivered by the Observable

##

```

```
