# NestJS

![alt text](clean-arc.png)

## 1. NestJS and Angular

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

## 2. Concepts

### 1. Modules: Groups features

- A NestJS application is a graph made of modules

```
            Root Module
            /          \
    Module A            Module B
```

- It's a container that groups the blcoks of a feature
  - controllers
  - services
  - other providers (guards, pipes, interceptors, repositories)
  - imported and exported modules

```ts
@Module({})
export class MyModule {}
```

```bash
nest g module <name>
```

- The import property defines how modules are organized

### 2. Decorators

- Used to declare what something is and how it should behave
- Metadata attached to: classes, methods, and params

```ts
@ClassDecorator()
class MyClass {

  @MethodDecorator
  myMethod(@ArgDecorator() myArgs: unknown);
}
```

#### 1. @Module()

- Defines a module and its structure

```ts
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService], // a class with @Injectable
  exports: [],
})
export class UserModule {}
```

#### 2. @Injectable()

- Marks a class as a provider that can participate in DI

```ts
@Injectable() // allows this class to be injected into constructors
export class UserService {}
```

- Nest can now instantiate and inject it into constructors

#### 3. @Controller()

- Maps a class to a route prefix
- Defines a controller responsible for incoming HTTP requests

```ts
@Controller("users")
export class UserController
```

#### 4. @Http Route Decorators(): @Get, @Post, @Patch, @Delete

- Attach a method to a specific HTTP verb + path

```ts
@Get(":id")
findOne(@Param("id") id:string){}
```

### 3. Controllers: Handles HTTP Requests

- Entry point for incoming HTTP requests
- Receives the request -> delegates to service -> return the response
- It shouldn't contain business logic, it's only an interface adapter

```bash
nest g controller <name>
```

- They can extract
  - route params: `@Param()`
  - query params: `@Query()`
  - body payload: `@Body()`
  - headers: `@Headers()`
  - cookies: `@Req()`

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDTO) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateUserDTO) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
```

### 4. Services: Handles Business Logic

- The real work the app does
- It performs:
  - Database operations/queries
  - Calling other APIs
  - applying rules
  - validating data
  - transforming data
  - handling transactions
  - triggering events
  - working with files

```ts
@Injectable() // service is usually @Injectable()
// this is what we import into the constructor of our controller
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(dto: CreateUserDTO) {
    const user = { id: Date.now().toString(), ...dto };
    this.users.push(user);
    return user;
  }

  update(id, dto: CreateUserDTO) {
    const user = this.findOne(id);

    if (!user) {
      return null;
    }

    Object.assign(user, dto);
    return user;
  }

  remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }
}
```

## 3. Commands

```bash
npm install -g @nestjs/cli

nest new <app>
nest g module <module>
nest g controller <controller>
nest g service <service>
nest g resource <resource> # full CRUD: module + controller + service + DTOs

nest start
nest start --watch # watch mode
# CTRL + C to stop server
nest build
nest info
```

## 4. DTO: How data is sent over the network

- DTO: Data Transfer Object
  - Contract between client and server
- It's a class that defines the shape of data that comes into/out of the application, typically through HTTP requests
- In nestjs, they represent:
  - request bodies
  - query params
  - update payloads
  - response shapes

- They are used for: bodies, queries, responses

- They represent API contracts, not domain models

### Why are they used

1. Validation

- They work with `class-validator` and `class-transformer`

```ts
export class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
```

- Now, nestjs **auto-validates** the incoming request before it reaches the controller/service

2. Transformation

- They can transform incoming data
  - strings into nums
  - trimming
  - parsing

3. Explicit API contract

- Clients know exactly what the backend expects

4. Security

- DTOs whitelist fields, this means, it prevents attacks of sending extra fields that app shouldn't accept

5. Decoupling

- Separate data structure from business logic

### DTO vs. Type

| Concept | Definition          | Used for                         | Why important                           |
| ------- | ------------------- | -------------------------------- | --------------------------------------- |
| Type    | Internal shape data | domain logic, services, DB layer | expressive, flexible                    |
| DTO     | Shape of IO         | controllers, validation          | security, validation, safety, contracts |

- Types represent **domain model**, aka internal application data
- It's not meant for validation, transformation, or HTTP input

```ts
type Episode = {
  id: string;
  name: string;
};
```

- DTOs describe what the client is allowed to send

```ts
export class CreateEpisodeDto {
  name: string;
}
```

#### Examples

- Services

```ts
create(dto: CreateEpisodeDto): Episode {
  const episode: Episode = {
    ...
  }

  ...
}
```

- Controller

```ts
@Post
create(@Body dto: CreateEpisodeDto){
  return this.service.create(dto)
}
```

### Getting started with DTOs

#### 1. install packages

```
npm install class-validator class-transformer
```

- class-validator: Provides decorators for validating DTOs
- class-transformer: Converts plain objects to instances of DTO classes

#### 2. Define DTO

```ts
// src/<entity>/dto/<dto-type>.dto.ts
// src/users/dto/create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
```

#### 3. Use it in a controller

```ts
// src/users/users.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post
  async createUser(@Body dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
```

## 5. Providers

- Nearly everything in NestJS is a provider
- Providers can `@Injectable()`
  - They are the backbone of DI

- Providers can be injected into:
- Controllers

```ts
class Controller {
  constructor(private readonly service: MyService) {}
}
```

- Other providers (like services)

```ts
@Injectable
class MyService {
  constructor(private readonly service: ServiceTwo) {}
}
```

- Repositories

```ts
@Injectable
class MyService {
  constructor(private readonly repo: MyRepo) {}
}
```

- Guards

```ts
@Injectable
class AuthGuard implements CanActivate {
  constructor(private readonly service: MyService) {}
}
```

- Pipes

```ts
@Injectable
export class ParseEpisodePipe implements PipeTransform {
  constructor(private readonly service: MyService) {}
}
```

## 6. Testing

- NestJS testing is built around `Jest`
- `@nestjs/testing`: utility to create a testing module, which is like a mini Nest app for tets
- Unit tests
  - Services (business logic)
  - Repositories
  - Helpers / utils
  - guards / pipes / interceptors

### Unit testing a service

```ts
// episodes.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';

describe('EpisodesService', () => {
  // this is defined by default
  let service: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpisodesService],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should create an episode', () => {
    const epName = 'Episode 1';
    const result = await service.create({ name: epName });

    expect(result).toHaveProperty('id');
    expect(result.name).toBe(epName);
  });

  it('should return episodes in sorted asc order', () => {
    service.create({ name: 'B' });
    service.create({ name: 'A' });

    const episodes = await service.findAll('asc');
    expect(episodes[0].name).toBe('A');
  });
});
```

## 7. Error handling

- NestJS has built-in HTTP exceptions

```ts
throw new NotFoundException('');
throw new BadRequestException('Invalid data');
throw new UnauthorizedException();
throw new ForbiddenException();
throw new InternalServerErrorException();
```

- Use them inside the services, since they contain the business logic

```ts
findOne(id:string){
  const episode = this.episodes.find(e => e.id === id)

  if (!episode){
    throw new NotFoundException(`Episode with ${id} not found`)
  }

  return episode
}
```

### Create custom ones

- For domain-specific rules, you can create custom exceptions:

```ts
export class EpisodeNameTakenException extends BadRequestException {
  constructor(name: string) {
    super(`Episode name "${name}" is in use`);
  }
}

// using it in the service
if (exists) {
  throw new EpisodeNameTakenException(dto.name);
}
```

## 8. Pipes: Pre-processing data

- They `____` incoming data before it reaches the controller
  - validate
  - transform
  - sanitize

Every pipe can do one or both:

1. Validate: Rejects the request if input is invalid

- `id must be a number`

2. Transform: Convert input into the expected format

- `convert "5" into 5`

- They can run on:

| Level         | Example                                  |
| ------------- | ---------------------------------------- |
| Method param  | @Param("id", ParseIntPipe)               |
| Route handler | @UsePipes(ValidationPipe)                |
| Controller    | @UsePipes() on class                     |
| Globally      | app.useGlobalPipes(new ValidationPipe()) |

### Built-in pipes

1. ValidationPipe

- The most important pipe in Nestjs
- Works with `class-validator` + DTOs

```ts
app.useGlobalPipes(new ValidationPipe());

// now, DTOs are automatically validated
class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

// now, if the request body is wrong, Nest returns `400 Bad request`
```

2. ParseIntPipe

- Converts "3" into 3 or throws 400 if invalid

```ts
@Get(":id")
findOne(@Param("id", ParseIntPipe) id:number){
  return this.service.findOne(id)
}
```
