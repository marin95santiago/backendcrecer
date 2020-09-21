const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    secondName:{
        type: String,
    },
    lastName:{
        type: String,
        required: true
    },
    enterprice:{
        type: String,
        required: true
    },
    idEnterprice:{
        type: String,
        required: true
    },
    entidad:{
        type: String
    },
    idEntidad:{
        type: String
    }
});

userSchema.methods.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.match = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema);