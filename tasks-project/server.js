const PORT = 5001;
const DB_FILE = "db.json";
const HEADER_CONFIG = {
  allow_origins: {
    title: "Access-Control-Allow-Origin",
    permission: "*",
  },
  allow_methods: {
    title: "Access-Control-Allow-Methods",
    permission: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  },
  allow_headers: {
    title: "Access-Control-Allow-Headers",
    permission: "Origin, X-Requested-With, Content-Type, Accept",
  },
};

const ALLOW_ORIGINS = "";

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(DB_FILE);

server.use((_, res, next) => {
  res.header(
    HEADER_CONFIG.allow_origins.title,
    HEADER_CONFIG.allow_origins.permission,
  );
  res.header(
    HEADER_CONFIG.allow_methods.title,
    HEADER_CONFIG.allow_methods.permission,
  );
  res.header(
    HEADER_CONFIG.allow_headers.title,
    HEADER_CONFIG.allow_headers.permission,
  );

  next();
});

server.use(router);
server.listen(PORT, () => {
  console.log(`Server port: ${PORT}\n---\nServer db: ${DB_FILE}`);
});
