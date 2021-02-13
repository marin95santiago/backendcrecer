const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const EntidadCaja = require('../models/entidadCaja');

router.get('/', isAuth, async (req, res) => {
    try {
        const response = await EntidadCaja.find({idEntidad: req.user.idEntidad});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'No se ha encontrado la caja de la entidad'});
    }
});

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await EntidadCaja.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'No se han encontrado los movimientos de caja de las entidades'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await EntidadCaja.findOne({serial: req.params.id});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'No se ha encontrado el movimiento de caja'});
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const { description, wayPay, date, serial, type, value } = req.body;
        const newMovement = new EntidadCaja ({
            idEnterprice: req.user.idEnterprice,
            idEntidad: req.user.idEntidad,
            description,
            wayPay,
            date,
            serial,
            type,
            value
        });
        const response = await newMovement.save();
        if(response){
            res.status(200).send({message: 'Movimiento de caja registrado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'No se ha registrado el movimiento de caja'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const { description, wayPay, date, serial, type, value } = req.body;
        const response = await EntidadCaja.findOneAndUpdate({serial: req.params.id}, {
            description,
            wayPay,
            date, 
            serial, 
            type, 
            value
        });
        if(response){
            res.status(200).send({message: 'Movimiento de caja actualizado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al momento de actualizar el movimiento de caja'});
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const response = await EntidadCaja.findOneAndDelete({serial: req.params.id});
        if(response){
            res.status(200).send({message: 'Movimiento de caja eliminado correctamente'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar el movimiento de caja'});
    }
});

module.exports = router;
