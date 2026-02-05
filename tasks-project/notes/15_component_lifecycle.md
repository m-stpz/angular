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

## 2. ngOnChanges

- Very first hook to run (before `ngOnInit`)
- Triggers everytime an `@Input()` property changes
- Good for:
  - re-calculate something every time a user passes in a new value from a parent component

## 3. ngAfterViewInit

- Runs after Angular has initialized the component's view and its child views (HTML template)
- Runs when the HTML is in the DOM and the children are ready
- Good for:
  - Accessing DOM elements via `ViewChild`
  - Initializing 3rd-party libs that need a DOM element (e.g., d3.js chart, Google map)

## 4. ngOnDestroy

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

## Full execution order

- OnChanges: inputs are set. first to run
  - reacts to input variable changing
- OnInit: component is born. before render
  - initialize API calls | setup logic
- DoCheck: ng checks for changes
- AfterContentInit: projecting external html
- AfterContentChecked: checking projected html
- AfterViewInit: components own html is ready
  - manipulate the DOM | use map/chart lib
- AfterViewChecked: checking the components' own html
- OnDestroy: component is killed
  - clean up subs | timers

## Example

```ts
import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, Input, SimpleChanges, ViewChild, ElementRef } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "./user.service";

@Component({
  selector: "app-user-profile",
  template: ` <div #mapContainer style="height: 200px;"></div>
    <h1>{{ user?.name }}</h1>`,
})
export class UserProfileComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input userId: string;
  @ViewChild("mapContainer") mapElement: ElementRef; // what is this?

  user: User;
  private sub: Subscription;

  constructor(private userService: UserService) {
    // only for DI (dependency injection)
    // elements and inputs aren't ready
  }

  ngOnChanges(changes: SimpleChanges) {
    // fires when `@Input()` value changes

    if (changes["userId"] && !changes["userId"].firstChange) {
      console.log(`id changed from ${changes["userId"].previousValue}`);
      this.loadUserData(); // refresh data if ID changes later
    }
  }
}
```
