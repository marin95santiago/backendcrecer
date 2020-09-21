const { Schema, model } = require('mongoose');

const bankSchema = new Schema ({
    idEnterprice:{
        type: String,
        required: true
    },
    idEntidad:{
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
        unique: true
    },
    typeAccount:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Bank', bankSchema);