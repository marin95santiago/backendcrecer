const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const ClaseConcepto = require('../models/claseConceptoCajaDiario');

router.get('/', isAuth, async (req, res) => {
    try {
        const response = await ClaseConcepto.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(203).json({message: 'Error al buscar tipos de entidades'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { idEnterprice, name } = req.body;

        const conceptClassFound = await ClaseConcepto.findOne({idEnterprice: idEnterprice, name: name});

        if(conceptClassFound)
            return res.status(203).json({message: `La clase de concepto ${name} ya fue creada`});
        
        const newClase = new ClaseConcepto ({
            idEnterprice: req.user.idEnterprice,
            name,
        });
        
        const response = await newClase.save();
        if(response){
            res.status(200).json({message: `La clase de concepto ${name} se creó con éxito`});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al crear clase de concepto de caja diario'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await ClaseConcepto.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).json({message: `Clase de concepto de caja diario eliminado con éxito`});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al eliminar clase de concepto de caja diario'});
    }
});

module.exports = router;