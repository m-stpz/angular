# RxJS Crash Course

Source: https://www.youtube.com/watch?v=tGWBy6Vqq9w

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
