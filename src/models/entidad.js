const { Schema, model } = require('mongoose');

const entidadSchema = new Schema ({
    enterprice:{
        type: String,
        required: true
    },
    idEnterprice:{
        type: String,
        required: true
    },
    typeEntidad:{
        type: String,
        required: true
    },
    nit: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    saldoCajaDiario: {
        type: Array,
        required: true
    },
    saldoBancos: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Entidad', entidadSchema);