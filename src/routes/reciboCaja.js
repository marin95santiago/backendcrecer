const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const ReciboCajaDiario = require('../models/reciboCaja');

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(203).json({message: 'Error al obtener los recibos de caja'});
    }
});

router.get('/client', isAuth, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.find({idEntidad: req.user.idEntidad});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(203).json({message: 'Error al obtener los recibos de caja'});
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const { 
            type, 
            date, 
            serial, 
            third, 
            classThird, 
            valueText, 
            valueNumber, 
            wayPay, 
            tableConcept 
        } = req.body;

        const receiptFound = await ReciboCajaDiario.findOne({
            idEntidad: req.user.idEntidad,
            serial: serial,
        });

        if(receiptFound)
            return res.status(203).json({message: `Ya existe un recibo de caja diario con el serial ${serial}`});

        const newRecibo = new ReciboCajaDiario ({
            enterprice: req.user.enterprice, 
            idEnterprice: req.user.idEnterprice,
            entidad: req.user.entidad,
            idEntidad: req.user.idEntidad,
            user: `${req.user.name} ${req.user.lastname}`,
            emailUser: req.user.email,
            idUser: req.user._id,
            type, 
            date, 
            serial, 
            third,
            classThird,
            valueText, 
            valueNumber, 
            wayPay, 
            tableConcept
        });
        const response = await newRecibo.save();
        if(response){
            res.status(200).json({message: 'Recibo de caja diario creado con éxito'});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al crear recibo de caja diario'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.findOne({_id: req.params.id});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(203).json({message: 'Error al buscar recibo de caja diario'});
    }
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const {
            date, 
            serial, 
            type, 
            number, 
            third, 
            classThird, 
            valueText, 
            valueNumber, 
            wayPay, 
            tableConcept
        } = req.body;
        
        const response = await ReciboCajaDiario.findOneAndUpdate({_id: req.params.id}, {
            user: `${req.user.name} ${req.user.lastname}`,
            idUser: req.user._id, 
            date,
            serial,
            type,
            number, 
            third,
            classThird,
            valueText, 
            valueNumber, 
            wayPay, 
            tableConcept
        });
        if(response){
            res.status(200).json({message: 'Recibo de caja diario actualizado con éxito'});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al actualizar recibo de caja diario'});
    }
});

// ruta para migrar recibos de caja de un tercero a otro

router.post('/migration', isAuth, async (req, res) => {
    try {
        const { beforeThird, newThird, idEntidad } = req.body;
        const response = await ReciboCajaDiario.find({idEntidad: idEntidad || req.user.idEntidad})
        for(let i = 0; i < response.length; i ++){
            if(response[i].third === beforeThird){
                await ReciboCajaDiario.findOneAndUpdate({_id: response[i]._id}, {
                    third: newThird
                });
            }
        }
        
        res.status(200).json({message: 'Migración de recibos realizada con éxito'});

    } catch (error) {
        res.status(203).json({message: 'Error al migrar recibos de caja diario'});
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const response = await ReciboCajaDiario.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).json({message: 'Recibo de caja eliminado con éxito'});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al eliminar recibo de caja diario'});
    }
});

module.exports = router;