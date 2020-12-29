const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const AjusteBanco = require('../models/ajusteBancos');

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await AjusteBanco.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los ajustes de bancos'})
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { idEntidad, entidad, serial, bank, numberAccount, type, description, value } = req.body;
        const newAjusteBanco = new AjusteBanco ({
            idEnterprice: req.user.idEnterprice,
            idEntidad,
            entidad,
            serial,
            bank,
            numberAccount,
            type,
            description,
            value
        });
        const response = await newAjusteBanco.save();
        if(response){
            res.status(200).send({message: 'Ajuste de banco creado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al crear ajuste de banco'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await AjusteBanco.findOne({_id: req.params.id});
        if(response){
            res.send(response)
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar ajuste de banco'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const { idEntidad, entidad, serial, bank, numberAccount, type, description, value } = req.body;
        const response = await AjusteBanco.findOneAndUpdate({_id: req.params.id}, {
            idEntidad,
            entidad,
            serial,
            bank,
            numberAccount,
            type,
            description,
            value
        });
        if(response){
            res.status(200).send({message: 'Ajuste de banco actualizado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar el ajuste de banco'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await AjusteBanco.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Ajuste de banco eliminado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar ajuste de banco'});
    }
});

module.exports = router;