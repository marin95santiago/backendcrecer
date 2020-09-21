const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const Entidad = require('../models/entidad');

router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await Entidad.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.send(response)
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar entidades'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const response = await Entidad.findOne({_id: req.params.id});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar entidad'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { enterprice, idEnterprice, typeEntidad, nit, name, address, phone, saldoCajaDiario, saldoBancos } = req.body;
        const newEntidad = new Entidad ({
            enterprice,
            idEnterprice, 
            typeEntidad,
            nit, 
            name, 
            address, 
            phone, 
            saldoCajaDiario, 
            saldoBancos
        });
        const response = await newEntidad.save();
        if(response){
            res.status(200).send({message: 'Entidad creada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al crear entidad'});
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const { typeEntidad, nit, name, address, phone, saldoCajaDiario, saldoBancos } = req.body;
        const response = await Entidad.findOneAndUpdate({_id: req.params.id}, {
            typeEntidad,
            nit, 
            name, 
            address, 
            phone, 
            saldoCajaDiario, 
            saldoBancos
        });

        if(response){
            res.status(200).send({message: 'Entidad actualizada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar entidad'})
    }
});

router.put('/saldos/bancos/:id', isAuth, async (req, res) => {
    try {
        const { saldoBancos } = req.body;
       
        const response = await Entidad.findOneAndUpdate({_id: req.params.id}, {
            saldoBancos
        });

        if(response){
            res.status(200).send({message: 'Saldos actualizados con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar saldos'});
    }
});

router.put('/saldos/caja/:id', isAuth, async (req, res) => {
    try {
        const { saldoCajaDiario } = req.body;

        const response = await Entidad.findOneAndUpdate({_id: req.params.id}, {
            saldoCajaDiario,
        });

        if(response){
            res.status(200).send({message: 'Saldos actualizados con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar saldos'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await Entidad.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Entidad eliminada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar entidad'});
    }
});

module.exports = router;