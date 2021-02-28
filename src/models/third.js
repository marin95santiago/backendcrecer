const { Schema, model } = require('mongoose');

const thirdSchema = new Schema ({
    idEnterprice: {
        type: String,
        required: true
    },
    idEntidad: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    typeThird: {
        type: String,
    },
    typeDocument: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    enterpriceName: {
        type: String,
    },
    name: {
        type: String,
    },
    secondName: {
        type: String
    },
    lastName: {
        type: String
    },
    classThird: {
        type: Array,
        required: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Third', thirdSchema)

