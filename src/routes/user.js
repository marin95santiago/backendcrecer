const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { isAuth, isAdmin } = require('../util/tokenHandler');

const User = require('../models/user');

const SECRET = process.env.SECRET || 'SECRETFORJWTOKEN';

router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await User.find();
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al consultar usuarios'});
    }
});

router.get('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await User.findOne({_id: req.params.id});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al consultar usuario'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { isAdmin, email, password, name, secondName, lastName, entidad, idEntidad } = req.body;
        const newUser = new User ({
            isAdmin, 
            email, 
            password, 
            name,
            secondName,
            lastName,
            enterprice: req.user.enterprice,
            idEnterprice: req.user.idEnterprice,
            entidad,
            idEntidad
        });

        newUser.password = await newUser.encrypt(password);

        const response = await newUser.save();
        if(response){
            res.status(200).send({message: 'Usuario creado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al crear nuevo usuario'});
    }
});

router.post('/new/user/dev/santiago-marin', async (req, res) => {
    try {
        const { isAdmin, email, password, name, secondName, lastName, enterprice, idEnterprice } = req.body;
        const newUser = new User ({
            isAdmin, 
            email, 
            password, 
            name,
            secondName,
            lastName,
            enterprice,
            idEnterprice,
        });

        newUser.password = await newUser.encrypt(password);

        const response = await newUser.save();
        if(response){
            res.status(200).send({message: 'Usuario creado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al crear nuevo usuario'});
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const { name, secondName, lastName, entidad, idEntidad } = req.body;

        const response = await User.findOneAndUpdate({_id: req.params.id},{
            name,
            secondName,
            lastName,
            entidad,
            idEntidad
        });

        if(response){
            res.status(200).send({message: 'Usuario actualizado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar usuario'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await User.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Usuario eliminado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar usuario'});
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(404).send({message: 'Usuario no encontrado'});
        } else {
            match = await user.match(password);
            if(!match){
                res.status(404).send({message: 'Contraseña inválida'});
            } else {
                let token = jwt.sign({
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    email: user.email,
                    name: user.name,
                    lastName: user.lastName, 
                    enterprice: user.enterprice,
                    idEnterprice: user.idEnterprice,
                    entidad: user.entidad,
                    idEntidad: user.idEntidad
                    
                }, SECRET, {expiresIn: '12h'});

                res.send(token)
            }
        }
    } catch (error) {
        res.status(500).send({message: 'Error al iniciar sesión'});
    }
});

module.exports = router;