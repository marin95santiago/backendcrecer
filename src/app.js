const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

// settings
app.set('port', process.env.PORT || 5000);

// midlewared
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/api/enterprice', require('./routes/enterprice'));
app.use('/api/user', require('./routes/user'));
app.use('/api/type-entidad', require('./routes/tipoEntidad'));
app.use('/api/clase-concepto-caja-diario', require('./routes/claseConceptoCajaDiario'));
app.use('/api/concepto-caja-diario', require('./routes/conceptoCajaDiario'));
app.use('/api/entidad', require('./routes/entidad'));
app.use('/api/bank', require('./routes/bank'));
app.use('/api/transaccion-interna', require('./routes/transaccionInterna'));
app.use('/api/ajuste-banco', require('./routes/ajusteBanco'));

app.use('/api/recibo-caja-diario', require('./routes/reciboCaja'));

module.exports = app;