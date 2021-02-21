const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const ClassThird = require('../models/classThird');

router.get('/', isAuth, async (req, res) => {
    try {
        const response = await ClassThird.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al momento de buscar las clases de terceros'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await ClassThird.findOne({_id: req.params.id});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al momento de buscar las clases de terceros'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const {
            classThird,
            description
        } = req.body;

        const newClassThird = new ClassThird({
            idEnterprice: req.user.idEnterprice,
            idUser: req.user._id,
            classThird,
            description
        });

        const response = await newClassThird.save();

        if(response){
            res.status(200).send({message: 'Clase de tercero creada con éxito'});
        }

    } catch (error) {
        res.status(500).send({message: 'Error al momento de crear la clase de tercero'});
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const {
            classThird,
            description,
        } = req.body

        const response = await ClassThird.findOneAndUpdate({_id: req.params.id},{
            classThird,
            description
        });

        if(response){
            res.status(200).send({message: 'Clase de tercero actualizado correctamente'});
        }

    } catch (error) {
        res.status(500).send({message: 'Error al momento de actualizar la clase de tercero'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await ClassThird.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Clase de tercero eliminado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al momento de eliminar la clase de tercero'});
    }
});

module.exports = router;