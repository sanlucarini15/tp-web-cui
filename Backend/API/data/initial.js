const mongoose = require('mongoose');
const data = require('./data.json');
var conection = require('../controller/connectionDB.js');
var model = require('../models/ArticleSchema.js');

conection.conectar();

model.create(data).then(() => console.log('La carga inicial tuvo éxito')).catch((err) => console.error("Error ", err)).finally(() => mongoose.connection.close());