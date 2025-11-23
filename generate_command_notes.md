# Angular CLI `generate` command

- Command to generate different schematics/config

```bash
ng generate <ng-schematic> [options]
ng g <ng-schematic> [options]
```

https://angular.dev/cli/generate

| Generate    | Use for                      | Example              |
| ----------- | ---------------------------- | -------------------- |
| component   | UI + template                | pages, cards, forms  |
| service     | logic, API, and shared state | TodosService         |
| directive   | DOM behavior                 | highlight on hover   |
| pipe        | transform values             | truncate, formatDate |
| guard       | protect routes               | AuthGuard            |
| resolver    | fetch before route loads     | PostResolver         |
| interceptor | transform HTTP requests      | TokenInterceptor     |
| interface   | models                       | Todo, User           |
| enum        | constant sets                | UserRole             |
| class       | utils                        | AuthHelper           |
| module      | legacy grouping              | Admin module         |
