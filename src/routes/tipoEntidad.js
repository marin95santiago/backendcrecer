const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const TipoEntidad = require('../models/tipoEntidad');

router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await TipoEntidad.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.send(response)
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar tipos de entidades'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { name, description } = req.body;
        const newTipoEntidad = new TipoEntidad ({
            idEnterprice: req.user.idEnterprice,
            name,
            description
        });
        const response = await newTipoEntidad.save();
        if(response){
            res.status(200).send({message: 'Tipo de entidad creada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al crear tipo de entidad'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await TipoEntidad.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Tipo de entidad eliminada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar tipo de entidad'});
    }
});

module.exports = router;