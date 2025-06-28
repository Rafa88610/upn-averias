const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');

const productos = require('./modulos/productos/rutas'); 
const auth = require('./modulos/auth/rutas');

const error = require('./red/errors');
const clientes = require('./modulos/clientes/rutas');
const averias = require('./modulos/averias/rutas');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.set('port', config.app.port)

//rutas

app.use('/api/productos',productos);
app.use('/api/auth',auth);
app.use('/api/clientes',clientes);
app.use('/api/averias',averias);



app.use(error);

module.exports = app;