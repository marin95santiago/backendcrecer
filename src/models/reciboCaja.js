const { Schema, model } = require('mongoose');

const reciboCajaDiarioSchema = new Schema ({
    enterprice:{
        type: String,
        required: true
    },
    idEnterprice:{
        type: String,
        required: true
    },
    entidad:{
        type: String,
        required: true
    },
    idEntidad:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    emailUser: {
        type: String,
        required: true
    },
    idUser:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
    },
    serial:{
        type: String,
        required: true
    },
    third:{
        type: String,
        required: true
    },
    classThird:{
        type: String,
        required: true
    },
    valueText:{
        type: String,
        required: true
    },
    valueNumber:{
        type: Number,
        required: true
    },
    wayPay:{
        type: Array,
        required: true
    },
    tableConcept:{
        type: Array,
        required: true
    },
    
}, {
    timestamps: true
});

module.exports = model('ReciboCajaDiario', reciboCajaDiarioSchema);