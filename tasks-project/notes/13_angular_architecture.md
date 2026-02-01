# Angular Architecture

## 1. Ivy Engine & Incremental DOM

- React uses VDOM, Angular uses Incremental DOM
- When code is compiled, Ivy turns your components into a series of instructions
- Instead of creating a whole tree of virtual nodes to compare (React VDOM and diffing), it directly updates the real DOM only where data has changed

## 2. Change detection & Zone.js

- Angular used to rely on Zone.js to know when something changed
- It "patches" browser events so that whenever an event occurs, Angular runs a check across the component tree to check if the UI needs updating

## 3. Dependency Injection

- Instead of components fetching their own data, or creating their own services, Angular's DI system "injects" what they need
- Code becomes highly reusable and easy to test

## 4. Signals

- The most Angular's equivale to `useState` in React, however, differently
- Signals provide fine-grained reactivity
- Instead of checking the whole component tree, Angular can pinpoint exactly which part of the template needs change
- Potentially moves the framework towards a Zoneless future
