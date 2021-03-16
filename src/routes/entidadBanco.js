const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const EntidadBanco = require('../models/entidadBanco');

router.get('/', isAuth, async (req, res) => {
    try {
        const response = await EntidadBanco.find({idEntidad: req.user.idEntidad});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(204).json({message: 'No se han encontrado los movimientos de banco de la entidad'});
    }
});

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await EntidadBanco.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(204).json({message: 'No se han encontrado los movimientos de banco de las entidades'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await EntidadBanco.findOne({serial: req.params.id});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(204).json({message: 'No se ha encontrado el movimiento de banco'});
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const { idEntidad, description, wayPay, date, serial, type, bank, value } = req.body;
        const newMovement = new EntidadBanco ({
            idEnterprice: req.user.idEnterprice,
            idEntidad: req.user.idEntidad || idEntidad,
            description,
            wayPay,
            date,
            serial,
            type,
            bank,
            value
        });
        const response = await newMovement.save();
        if(response){
            res.status(200).json({message: 'Movimiento de banco registrado con éxito'});
        }
    } catch (error) {
        res.status(204).json({message: 'No se ha registrado el movimiento de banco'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const { description, wayPay, date, serial, type, bank, value } = req.body;
        const response = await EntidadBanco.findOneAndUpdate({serial: req.params.id}, {
            description,
            wayPay,
            date, 
            serial, 
            type,
            bank,
            value
        });
        if(response){
            res.status(200).json({message: 'Movimiento de banco actualizado con éxito'});
        }
    } catch (error) {
        res.status(204).json({message: 'Error al momento de actualizar el movimiento de banco'});
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const response = await EntidadBanco.findOneAndDelete({serial: req.params.id});
        if(response){
            res.status(200).json({message: 'Movimiento de banco eliminado correctamente'});
        }
    } catch (error) {
        res.status(204).json({message: 'Error al eliminar el movimiento de banco'});
    }
});

module.exports = router;