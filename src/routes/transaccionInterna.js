const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const TransaccionInterna = require('../models/transaccionInterna');

router.get('/client', isAuth, async (req, res) => {
    try {
        const response = await TransaccionInterna.find({idEntidad: req.user.idEntidad});
        res.send(response);
    } catch (error) {
        res.status(500).send({message: 'Error al buscar recibos de transacción interna'});
    }
});

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await TransaccionInterna.find({idEnterprice: req.user.idEnterprice});
        res.send(response);
    } catch (error) {
        res.status(500).send({message: 'Error al buscar recibos de transacción interna'});
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const { type, date, serial, bank, value } = req.body;
        
        const newTransaccionInterna = new TransaccionInterna ({
            idEnterprice: req.user.idEnterprice,
            idEntidad: req.user.idEntidad,
            idUser: req.user._id,
            entidad: req.user.entidad,
            type,
            date,
            serial,
            bank,
            value
        });
        
        const response = await newTransaccionInterna.save();
        res.send({message: 'Transacción interna creada con éxito'});

    } catch (error) {
        res.status(500).send({message: 'Error al crear transacción interna'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const { type, bank, value } = req.body;
        await TransaccionInterna.findOneAndUpdate({_id: req.params.id}, {
            type,
            bank,
            value
        });

        res.send({message: 'Transacción interna modificada con éxito'});

    } catch (error) {
        res.status(500).send({message: 'Error al actualizar transacción interna'});
    }
});

module.exports = router;