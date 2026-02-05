# Component Lifecycles

## 1. ngOnInit

- Most common hook
- Runs after Angular has finished initializing the component's input properties
- Runs:
  - after constructor
  - before render

Constructor -> ngOnInit -> render

- Good for:
  - fetching data from API/service
  - setting up initial logic based on `@Input()` values

## 2. ngAfterViewInit

- Runs after Angular has initialized the component's view and its child views (HTML template)
- Runs when the HTML is in the DOM and the children are ready
- Good for:
  - Accessing DOM elements via `ViewChild`
  - Initializing 3rd-party libs that need a DOM element (e.g., d3.js chart, Google map)

## 3. ngOnDestroy

- Clean up
- Runs before Angular destroys the component and removes it from the DOM
- Runs:
  - user navigates to a different route
  - component is removed via `*ngIf`

- Good for:
  - unsub from Observables to prevent memory leak
  - stopping intervals or timers
  - disconnecting from websockets or event listeners

## Legacy

- On older angular codebases, we encounter

```
ngOnInit: `this.dataService.get().subscribe(...)`
ngOnDestroy: `this.subscription.unsubscribe()`
```
