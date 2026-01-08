# Nx, Nestjs and Angular

- How to config them together?

```bash
# create angular nx repo
npx create-nx-workspace@latest <name>
> select angular
> select integrated monorepo

# add nestjs
npx nx add @nx/nest
nox nx g @nx/nest:app apps/api # generate an api within the nestworkspace
```
