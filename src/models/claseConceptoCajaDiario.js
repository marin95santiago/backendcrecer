const { Schema, model } = require('mongoose');

const claseConceptoCajaDiarioSchema = new Schema ({
    idEnterprice:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = model('ClaseConcepto', claseConceptoCajaDiarioSchema);