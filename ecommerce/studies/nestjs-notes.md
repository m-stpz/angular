# NestJS

![alt text](clean-arc.png)

## NestJS and Angular

NestJS architecture is basically angular transplanted to the backend

- Modules group featurs
- Decorators declare intent
- DI glues everything
- Controllers/Components orchestrate services
- Pipe/Guards/Interceptors behave the same
- Same mental model, different domains

### 1. Modules as the main organizational unit

- Both put together and expose building blocks
  - Group features (AuthModel/UsersModule)
  - Control imports/exports
  - Encapsulate domain boundaries

### 2. Depency Injection everywhere

- Both frameworks use DI as the core pattern
  - Constructor injection
  - Providers registered in modules
  - Scopes (singleton, request-scoped)

### 3. Decorator-driven architecture

- Both rely on decorators to declare intent instead of configuration
  - Angular: @Component(), @Injectable(), @NgModule()
  - NestJS: @Controller(), @Injectable(), @Module()
- Declarative, metadata-driven structure

### 4. Thin controllers, fat services

- Controllers/Components handle the interface layer (HTTP or UI)
- Services hold logic and coordinate data

Angular: Component -> Service
NestJS: Controller -> Service

### 5. Middleware-like layers

Angular and NestJS have:

- Pipes: transform/validate data
- Guards: route authorization
- Interceptors: cross-cutting logic
