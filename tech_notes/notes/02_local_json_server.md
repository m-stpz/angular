# Local JSON Server

```bash
# install deps
npm i json-server -D
```

- Package.json

```
"scripts": {
    ...,
    "server": "json-server --watch db.json --port 5000"
}
```

- Create the db.json file
- Then run

```
npm run server
```
