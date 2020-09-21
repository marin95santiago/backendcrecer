const { Schema, model } = require('mongoose');

const tipoEntidadSchema = new Schema ({
    idEnterprice:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('TipoEntidad', tipoEntidadSchema);