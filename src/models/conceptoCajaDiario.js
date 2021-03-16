const { Schema, model } = require('mongoose');

const conceptoCajaDiarioSchema = new Schema ({
    idEnterprice:{
        type: String,
        required: true
    },
    forTypeEntidad:{
        type: String,
        required: true
    },
    concept:{
        type: String,
        required: true
    },
    classConcept:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
});

module.exports = model('ConceptoCajaDiario', conceptoCajaDiarioSchema);