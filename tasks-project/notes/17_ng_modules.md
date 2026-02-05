# NgModules

- Legacy Angular (pre-version 17 - 2023 -)
- NgModules are "containers" or "buckets" that organize the code
- When dealing with a module that has multiple children, the goal is to create a "Shared Module", a **central hub**
- This way, we declare things once and don't need to import them everywhere

## Concept

- If component A wants to use component B, they must both be in the same "bucket" (module), or Component A's bucket must import Component's B bucket

- Declarations: what lives inside this module (Components, Directives, Pipes)
- Exports: what this module allows other modules to use
- Imports: what this module needs from outside

<!-- to continue -->
