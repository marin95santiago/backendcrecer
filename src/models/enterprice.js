const { Schema, model } = require('mongoose');

const enterpriceSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    nit:{
        type: String,
        required: true
    },
    bossName:{
        type: String,
        required: true
    },
    bossLastName:{
        type: String,
        required: true
    },
    document:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

module.exports = model('Enterprice', enterpriceSchema);