const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const TransaccionInterna = require('../models/transaccionInterna');

router.get('/client', isAuth, async (req, res) => {
    try {
        const response = await TransaccionInterna.find({idEntidad: req.user.idEntidad});
        res.status(200).send(response);
    } catch (error) {
        res.status(203).json({message: 'Error al buscar recibos de transacción interna'});
    }
});

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await TransaccionInterna.find({idEnterprice: req.user.idEnterprice});
        res.status(200).send(response);
    } catch (error) {
        res.status(203).json({message: 'Error al buscar recibos de transacción interna'});
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const { type, date, serial, bank, value } = req.body;

        const internalTransactionFound = await TransaccionInterna.findOne({
            idEntidad: req.user.idEntidad,
            serial: serial
        });

        if(internalTransactionFound)
            return res.status(203).json({message: `Ya existe una transacción interna con el serial ${serial}`});
        
        const newTransaccionInterna = new TransaccionInterna ({
            idEnterprice: req.user.idEnterprice,
            idEntidad: req.user.idEntidad,
            entidad: req.user.entidad,
            idUser: req.user._id,
            emailUser: req.user.email,
            type,
            date,
            serial,
            bank,
            value
        });
        
        const response = await newTransaccionInterna.save();

        res.status(200).json({message: 'Transacción interna creada con éxito'});

    } catch (error) {
        res.status(203).json({message: 'Error al crear transacción interna'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const { type, serial, bank, value } = req.body;
        
        const response = await TransaccionInterna.findOneAndUpdate({_id: req.params.id}, {
            idUser: req.user._id,
            emailUser: req.user.email,
            type,
            serial,
            bank,
            value
        });

        if(response){
            res.status(200).json({message: 'Transacción interna modificada con éxito'});
        }

    } catch (error) {
        res.status(203).json({message: 'Error al actualizar transacción interna'});
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const response = await TransaccionInterna.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).json({message: 'Transacción interna eliminada con éxito'});
        }

    } catch (error) {
        res.status(203).json({message: 'Error al eliminar transacción interna'});
    }
});

module.exports = router;