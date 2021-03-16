const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const TipoEntidad = require('../models/tipoEntidad');

router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await TipoEntidad.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(203).json({message: 'Error al buscar tipos de entidades'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { name, description } = req.body;

        const typeEntityFound = await TipoEntidad.findOne({
            idEnterprice: req.user.idEnterprice,
            name: name
        });

        if(typeEntityFound)
            return res.status(203).json({message: 'El tipo de entidad ya existe'});

        const newTipoEntidad = new TipoEntidad ({
            idEnterprice: req.user.idEnterprice,
            name,
            description
        });

        const response = await newTipoEntidad.save();

        if(response){
            res.status(200).json({message: `El tipo de entidad ${name} se creó con éxito`});
        }

    } catch (error) {
        res.status(203).json({message: 'Error al crear tipo de entidad'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await TipoEntidad.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).json({message: 'Tipo de entidad eliminada con éxito'});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al eliminar tipo de entidad'});
    }
});

module.exports = router;