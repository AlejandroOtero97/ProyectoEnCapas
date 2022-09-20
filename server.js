import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { passportInitialize, passportSession } from './middlewares/passport.js';
import { faker } from '@faker-js/faker'
import { auth, debug } from './middlewares/middlewares.js';

import MongoStore from 'connect-mongo';
import session from 'express-session';
import express from 'express';

import socketController from './controllers/socketController.js';

import apiControllers from './controllers/apiControllers.js';
import webControllers from './controllers/webController.js';
import authenticationController from './controllers/authenticationController.js';

import { port } from './parameters/parameters.js';
import initializeServer from './server/initializeServer.js';

import { logWarning } from './middlewares/logsMiddlewares.js';
import { logInfo } from './middlewares/logsMiddlewares.js';
import compression from 'compression'; 

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.get("/api/productos-test", (req, res) => {
    faker.locale = "en";
    const productosFaker = [];

  for (let i = 0; i < 5; i++) {
    productosFaker.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(100, 3000, 0, '$'),
      thumbnail: faker.image.business()
    });
  }
  res.json(productosFaker);
}); 

const mongoStore = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Alejandro:otero@coderhouse.av1btb7.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'foo',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}

const sessionHandler = session(mongoStore); 
app.use(sessionHandler)
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passportInitialize)
app.use(passportSession)

const { loginController, succesLogin, failureLogin, registerController, failureSignup, successSignup, logout } = authenticationController;
const { getName, getInfo, getNumbers } = apiControllers;
const { inicio, login, logoutB, signup, error, info, random, infoZip } = webControllers;

app.post('/api/login', logInfo, loginController)
app.get('/api/successLogin', logInfo, succesLogin)
app.get('/api/failureLogin', logInfo, failureLogin)
app.post('/api/signup', logInfo, registerController);
app.get('/api/failureSignup', logInfo, failureSignup)
app.get('/api/successSignup', logInfo, successSignup)

app.post('/api/logout', logInfo, logout)

app.get('/api/login', logInfo, getName);


app.get('/api/getInfo', logInfo, getInfo);
app.get('/api/getInfo-debug', logInfo, debug, getInfo);
app.get('/api/getInfoZip', compression(), logInfo, getInfo);
app.get('/api/randoms/:cant?', logInfo, getNumbers);
app.get('/api/randoms-debug/:cant?', logInfo, debug, getNumbers);

app.get('/', auth, logInfo, inicio)
app.get('/login', logInfo, login)
app.get('/logout', logInfo, logoutB)
app.get('/signup', logInfo, signup)
app.get('/info', auth, logInfo, info)
app.get('/infoZip', auth, logInfo, infoZip)
app.get('/random', auth, logInfo, random)
app.get('/error', error)

app.all('*', logWarning, (req, res) => {
  res.status(404).json( { error : 404, descripcion: `ruta '${req.url}' método '${req.method}' no implementada` } )
});

io.on('connection', socket => socketController(socket, io))

initializeServer(httpServer, port);
