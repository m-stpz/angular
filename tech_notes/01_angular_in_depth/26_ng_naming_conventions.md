# Naming conventions in Angular

- Prefix: comes at the start
- Suffix: comes at the end

## 1. Internal logic: `_`

- While official TS guide says underscore are unnecessary because of the `private` keyword, many devs still use it
- The official documentation suggests not to use them

1. Private methods/properties: signals to the developer that this logic is internal
   - You shouldn't call it from outside
   - It shouldn't be used in the HTML template

2. "Truly" private `#_variable`:

- You might see `#` prefix
- This is the official JS "private" syntax
- Unlike `private`, it actually hides the method at runtime

## 2. Stream marker: `$`

- Called **Finnish Notation**
- Most sacred convention in Angular
- `variable$`: Observable
  - The suffix (end) tells you: "This is a stream of values over time"
  - You can't use it like a normal variable, you must use an async pipe or `.subscribe()`

- `$variable`: Signal
  - With the rise of Signals, some teams are prefixing `$` a variable to signal a Signal

```
count$ => Observable
$count => Signal
count => static value
```

## 3. Store conventions (ComponentStore/NgRx)

| Prefix/Suffix          | Meaning                                                                                     | Example                         |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------------- |
| select<Name>           | Function to read data/slice store                                                           | selectActiveUsers               |
| load<Name>/get<Name>   | An effect (async)                                                                           | loadUserList, getUserList       |
| set<Name>/update<Name> | An updater (sync)                                                                           | setUserList, updateUserList     |
| vm$                    | View model. Common pattern where you combine all selectors into one big object for the html | readonly vm$ = this.select(...) |

## 4. Select naming: `on...` vs. `handle...`

- HTML: `button (click)="onSave()">
  - `on`: **this reacts to a user action**, on html

- TS: `handleSave()`
  - `handle`: **actual business logic**, on ts
