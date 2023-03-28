

// import dotenv from "dotenv";
// dotenv.config();

// import jsonServer from "json-server";
// import path from "path";
// import { join, dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// import ShortUniqueId from "short-unique-id";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { LowSync } from "lowdb";
// import { JSONFileSync } from "lowdb/node";
// import config from "./config.js";

// const serverPort = process.env.REACT_APP_JSON_SERVER_PORT;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const uid = new ShortUniqueId({ length: 10 });

// const file = path.join(__dirname, 'adminData.json');
// const adapter = new JSONFileSync(file);
// const db = new LowSync(adapter);
// // db.read();
// // db.data.users.push({ three: "four" });
// // db.write();

// const server = jsonServer.create();
// // foreign key suffix as second parameter to the module. Below code sets it to dummy
// // it fixes delete problem but causes expansion problems.
// const router = jsonServer.router(join(__dirname, 'adminData.json'),{
//   foreignKeySuffix: 'dummy'
// });


// const staticDir = path.join(__dirname, 'server-files');
// const middlewares = jsonServer.defaults({static: staticDir});

// server.use(middlewares);
// server.use(jsonServer.bodyParser);
// // server.use(express.static("public"));


// // Authorization logic
// server.use((req, res, next) => {
//   let NeedsAuthorization = false;

//   for (let i = 0; i < config.protectedRoutes.length; i++) {
//     let { route, methods } = config.protectedRoutes[i];

//     // if ((route === 'GET' && ))

//     if ((req.url).startsWith(route)) {
//       if (methods.includes(req.method)) {
//         NeedsAuthorization = true;
//         break;
//       }
//     }
//   }

//   if (NeedsAuthorization) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (!authHeader || !token)
//       return res
//         .status(403)
//         .send(
//           "Its a protected route/method. You need an auth token to access it."
//         );

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       if (err)
//         return res
//           .status(403)
//           .send("Some error occurred wile verifying token.");
//       req.user = user;
//       next();
//     });
//   } else {
//     next();
//   }
// });

// // default id & created at
// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }

//   if (req.method === "POST" && !req.body.id) {
//     req.body.id = uid();
//   }

//   if (req.method === "POST" && req.user && !req.body.userId) {
//     req.body.userId = req.user.id;
//   }

//   next();
// });

// // registration logic
// server.post("/user/register", (req, res) => {
//   if (
//     !req.body ||
//     !req.body.username ||
//     !req.body.password ||
//     !req.body.email
//   ) {
//     return res
//       .status(400)
//       .send("Bad request, requires username, password & email.");
//   }

//   db.read();
//   const users = db.data.users;
//   let largestId = 0;
//   users.forEach((user) => {
//     if (user.id > largestId) largestId = user.id;
//   });

//   const hashedPassword = bcrypt.hashSync(req.body.password, 10);
//   const newId = largestId + 1;
//   const newUserData = {
//     username: req.body.username,
//     password: hashedPassword,
//     email: req.body.email,
//     firstname: req.body.firstname || "",
//     lastname: req.body.lastname || "",
//     avatar: req.body.avatar || "",
//     createdAt: Date.now(),
//     id: newId,
//   };

//   db.data.users.push(newUserData);

//   db.write();

//   res.status(201).send(newUserData);
// });

// // login/sign in logic
// server.post("/user/login", (req, res) => {
//   if (!req.body || !req.body.username || !req.body.password) {
//     return res
//       .status(400)
//       .send("Bad request, requires username & password both.");
//   }

//   db.read();
//   const users = db.data.users;
//   const user = users.find((u) => u.username === req.body.username);
//   if (user == null) {
//     return res.status(400).send(`Cannot find user: ${req.body.username}`);
//   }

//   if (bcrypt.compareSync(req.body.password, user.password)) {
//     // creating JWT token
//     const accessToken = generateAccessToken(user);
//     return res.send({
//       accessToken: accessToken,
//       user: user
//     });
//   } else {
//     res.send("Not allowed, name/password mismatch.");
//   }
// });

// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3h" });
// }

// // To modify responses, overwrite router.render method:
// // In this example, returned resources will be wrapped in a body property
// // router.render = (req, res) => {
// //   res.jsonp({
// //     body: res.locals.data,
// //   });
// // };

// server.use(router);

// server.listen( serverPort, () => {
//   console.log(
//     `JSON Server is running at http://localhost:${serverPort}`
//   );
// });

// second 


const jsonServer = require('json-server')
const clone = require('clone')
const data = require('./db.json')

const isProductionEnv = process.env.NODE_ENV === 'production';
const server = jsonServer.create()

// For mocking the POST request, POST request won't make any changes to the DB in production environment
const router = jsonServer.router(isProductionEnv ? clone(data) : 'db.json', {
    _isFake: isProductionEnv
})
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
    if (req.path !== '/')
        router.db.setState(clone(data))
    next()
})

server.use(router)
server.listen(process.env.PORT || 8000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server