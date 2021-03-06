const { Schema, model } = require('mongoose');

const ajusteBancoSchema = new Schema ({
    idEnterprice:{
        type: String,
        required: true
    },
    idEntidad:{
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
    serial:{
        type: String,
        required: true
    },
    bank:{
        type: String,
        required: true
    },
    numberAccount:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('AjusteBanco', ajusteBancoSchema);