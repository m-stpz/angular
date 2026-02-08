# NgModules

- Legacy Angular (pre-version 17 - 2023 -)
- NgModules are "containers" or "buckets" that organize the code
- When dealing with a module that has multiple children, the goal is to create a "Shared Module", a **central hub**
- This way, we declare things once and don't need to import them everywhere

## Concept

- If component A wants to use component B, they must both be in the same "bucket" (module), or Component A's bucket must import Component's B bucket

- Declarations: what lives inside this module (Components, Directives, Pipes)
- Exports: what this module allows other modules to use
- Imports: what this module needs from outside (like `CommonModule` for `*ngIf`)

## Example

- If you have multiple child components, you don't want to import them individually into every page
- We "bundle" them

```ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { IconComponent } from "./icon/icon.component";

@NgModule({
  // what lives within the module
  declarations: [ButtonComponent, IconComponent],

  // what is needed from outside
  imports: [CommonModule],

  // what is shared with the outside
  exports: [ButtonComponent, IconComponent, CommonModule],
})
export class SharedModule {}


// == Other Module ==
@NgModule({                      // ^
    imports: [                   // |
        SharedModule // unlocks: Button, Icon, and CommonModule
    ],
    declarations: [DashboardComponent]
})
```

## Rules

- Components can be declared only once
  - `ButtonComponent` can't be put in the `declarations` of two different modules
- Services are provided in the `root` and aren't put on `exports`

## From NgModules to Standalone Components

- Since Angular 14, NgModules are optional and became more legacy

| Feature     | NgModule (Legacy)                           | Modern (standalone)    |
| ----------- | ------------------------------------------- | ---------------------- |
| Declaration | `NgModule` declaration                      | `standalone: true`     |
| Imports     | Module imports deps                         | Component imports deps |
| Locality    | Harder to tell where a component comes from | Easier to pin-point    |

- Standalone components are self-sufficient
  - faster (better tree-shaking)
  - easier to read
  - the path to "modern" Angular

### Why NgModule still exists

- Too big to fail: Difficult to refactor a large codebase to standalone
- `Shared` pattern: Some teams still prefer a `SharedModule` to bundle many UI components, so only one thing needs to be imported in the feature component
