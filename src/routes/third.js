const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const Third = require('../models/third');

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await Third.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar los terceros'});
    }
});

router.get('/', isAuth, async (req, res) => {
    try {
        const response = await Third.find({idEntidad: req.user.idEntidad});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar los terceros'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await Third.findOne({_id: req.params.id});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar el tercero'});
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const {
            idEntidad,
            idForReceipt,
            typeThird,
            typeDocument,
            document,
            enterpriceName,
            name,
            secondName,
            lastName,
            classThird,
            email,
            address,
            phone
        } = req.body

        const newThird = new Third({
            idEnterprice: req.user.idEnterprice,
            idEntidad: idEntidad || req.user.idEntidad,
            idUser: req.user._id,
            idForReceipt,
            typeThird,
            typeDocument,
            document,
            enterpriceName,
            name,
            secondName,
            lastName,
            classThird,
            email,
            address,
            phone
        });

        const response = await newThird.save();

        if(response){
            res.status(200).send({message: 'Tercero creado correctamente'});
        }

    } catch (error) {
        res.status(500).send({message: 'Error al momento de crear el tercero'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const {
            enterpriceName,
            name,
            secondName,
            lastName,
            classThird,
            email,
            address,
            phone
        } = req.body

        const response = await Third.findOneAndUpdate({_id: req.params.id},{
            enterpriceName,
            name,
            secondName,
            lastName,
            classThird,
            email,
            address,
            phone
        });

        if(response){
            res.status(200).send({message: 'Tercero actualizado correctamente'});
        }

    } catch (error) {
        res.status(500).send({message: 'Error al momento de actualizar el tercero'});
    }
});

router.put('/migration/:id', isAuth, async (req, res) => {
    try {
        const {
            idForReceipt
        } = req.body

        const response = await Third.findOneAndUpdate({_id: req.params.id},{
            idForReceipt
        });

        if(response){
            res.status(200).send({message: 'Migración de tercero realizada con éxito'});
        }

    } catch (error) {
        res.status(500).send({message: 'Error al momento de migrar el tercero'});
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const response = await Third.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Tercero eliminado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al momento de eliminar el tercero'})
    }
});

module.exports = router;