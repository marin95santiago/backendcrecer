const { Schema, model } = require('mongoose');

const classThirdSchema = new Schema({
    idEnterprice: {
        required: true,
        type: String
    },
    idUser: {
        type: String,
        required: true
    },
    classThird: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('ClassThird', classThirdSchema);