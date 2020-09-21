const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const ReciboCajaDiario = require('../models/reciboCaja');
/*
router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.find();
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los recibos de caja'})
    }
});
*/
router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los recibos de caja'})
    }
});

router.get('/client', isAuth, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.find({idEntidad: req.user.idEntidad});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los recibos de caja'})
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const { enterprice, idEnterprice, entidad, idEntidad, user, type, date, serial, client, valueText, valueNumber, wayPay, tableConcept } = req.body;
        const newRecibo = new ReciboCajaDiario ({
            enterprice, 
            idEnterprice,
            entidad,
            idEntidad,
            user,
            type, 
            date, 
            serial, 
            client, 
            valueText, 
            valueNumber, 
            wayPay, 
            tableConcept
        });
        const response = await newRecibo.save();
        if(response){
            res.status(200).send({message: 'Recibo de caja diario creado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al crear recibo de caja diario'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.findOne({_id: req.params.id});
        if(response){
            res.send(response)
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar recibo de caja diario'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const { user, date, type, number, client, valueText, valueNumber, wayPay, tableConcept } = req.body;
        const response = await ReciboCajaDiario.findOneAndUpdate({_id: req.params.id}, {
            user, 
            date,
            type, 
            number, 
            client, 
            valueText, 
            valueNumber, 
            wayPay, 
            tableConcept
        });
        if(response){
            res.status(200).send({message: 'Recibo de caja diario actualizado con éxito'})
        }
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar recibo de caja diario'})
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Recibo de caja eliminado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar recibo de caja diario'});
    }
});

module.exports = router;