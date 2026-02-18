# RxJS Crash Course

Source: https://www.youtube.com/watch?v=tGWBy6Vqq9w

## Terminology

- RxJS: lib for reactive programming using observables

- Observable
  - Emits a value
  - Like a person who brings a bag of ingredients home
  - Can emit multiple data

- Operators
  - They operate something on the data
  - Like a group of friends cooking together, each one with a 'function'

- Pipe
  - The combination of operators
  - The whole 'process' of data passing through the operators

- Observer
  - Once the pipeline is done, this is the portion that figures out what to do with the data

```js
/* 
                |             pipe         |
    observable -> operator 1 | operator 2 | ... -> observer
        ^                  ^                        ^
        data              operates on the data    what to do what to with the data
*/
```

## Observables

```bash
npm i rxjs # install deps
```

```ts
const { Observable } = require("rxjs");

// Observable takes a callback
// Observable(callback => {})
const observable = new Observable((subscriber) => {
  // observable can emit multiple data
  subscriber.next(10); // observable is emitting this data
  subscriber.next(100);
  subscriber.next(1000);
});

const observer = {
  next: (value) => {
    console.log("observer got value of ", value);
  }, // all is fine and well
  error: (err) => {
    console.log("observer got an error of", error);
  },
  complete: () => {
    console.log("observer got completed");
  }, // when it's done
};

observable.subscribe(observer); // connecting to observer to the observable

// output: observer got a value of 10
// ...
```
