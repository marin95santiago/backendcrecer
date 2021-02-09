const { Schema, model } = require('mongoose');

const transaccionInternaSchema = new Schema ({
    idEnterprice: {
        type: String,
        required: true
    },
    idEntidad: {
        type: String,
        required: true
    },
    entidad:{
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    emailUser: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    serial: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

module.exports = model('TransaccionInterna', transaccionInternaSchema);