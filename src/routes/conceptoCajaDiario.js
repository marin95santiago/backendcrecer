const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const ConceptoCajaDiario = require('../models/conceptoCajaDiario');

router.get('/', isAuth, async (req, res) => {
    try{
        const conceptos = await ConceptoCajaDiario.find({idEnterprice: req.user.idEnterprice});
        res.status(200).send(conceptos);
    } catch (error){
        res.status(203).json({message: 'Error al obtener conceptos'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { forTypeEntidad, concept, classConcept, type } = req.body;

        const conceptFound = await ConceptoCajaDiario.findOne({
            idEnterprice: req.user.idEnterprice,
            concept: concept
        });

        if(conceptFound)
            return res.status(203).json({message: `El concepto ${concept} ya fue creado`});

        const newConcept = new ConceptoCajaDiario ({
            idEnterprice: req.user.idEnterprice,
            forTypeEntidad,
            concept,
            classConcept, 
            type
        });

        const response = await newConcept.save();

        if(response){
            res.status(200).json({message: `Se creó el concepto ${concept} con éxito`});
        }

    } catch (error) {
        res.status(203).json({message: 'Error al momento de crear el concepto'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const concept = await ConceptoCajaDiario.findOne({_id: req.params.id});
        res.status(200).send(concept);

    } catch (error) {
        res.status(203).json({message: 'Error al buscar concepto'});
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const { forTypeEntidad, classConcept, type } = req.body;
        
        const response = await ConceptoCajaDiario.findOneAndUpdate({_id: req.params.id}, {
            forTypeEntidad,
            classConcept,
            type
        });

        if(response){
            res.status(200).json({message: 'Concepto modificado con éxito'});
        }

    } catch (error) {
        res.status(203).json({message: 'Error al modificar el concepto'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await ConceptoCajaDiario.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).json({message: 'Concepto eliminado con éxito'});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al eliminar el concepto'});
    }
});

module.exports = router;