const { Schema, model } = require('mongoose');

const entidadCajaSchema = new Schema ({
    idEnterprice:{
        type: String,
        required: true
    },
    idEntidad:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    wayPay: {
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
    type: {
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

module.exports = model('EntidadCaja', entidadCajaSchema);