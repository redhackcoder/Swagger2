var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

let {MongoClient} = require('mongodb');
let app = express();
const mongoUrl = 'mongodb://maninder:team%4012345%23@192.168.2.177:27017/?authSource=admin';
const mongoClient = new MongoClient(mongoUrl);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getShipmentDetails', async (req, res, next) => {
    
await mongoClient.connect();
let parameter = req.query.shipmentRef;

console.log(req.query)
  let seasonData = await mongoClient.db('NNC').collection('neoShipmentNew').find({'shipmentRef':parameter}).limit(100).toArray();
  
  res.send(seasonData);
})
module.exports = app;
