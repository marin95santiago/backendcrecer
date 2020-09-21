const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const ConceptoCajaDiario = require('../models/conceptoCajaDiario');

router.get('/', isAuth, async (req, res) => {
    try{
        const conceptos = await ConceptoCajaDiario.find({idEnterprice: req.user.idEnterprice});
        res.send(conceptos);
    } catch (error){
        res.send(error.message)
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { idEnterprice, forTypeEntidad, concept, classConcept, type } = req.body;
        const newConcept = new ConceptoCajaDiario ({
            idEnterprice,
            forTypeEntidad,
            concept,
            classConcept, 
            type
        });

        const response = await newConcept.save();

        if(response){
            res.status(200).send({message: 'Concepto creado con éxito'});
        }

    } catch (error) {
        res.status(500).send({message: 'Error al momento de crear el concepto'});
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const concept = await ConceptoCajaDiario.findOne({_id: req.params.id});
        res.send(concept)
    } catch (error) {
        res.status(500).send({message: 'Error al buscar concepto'});
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const { forTypeEntidad, concept, classConcept, type } = req.body;
        const response = await ConceptoCajaDiario.findOneAndUpdate({_id: req.params.id}, {
            forTypeEntidad,
            concept,
            classConcept, 
            type
        });

        if(response){
            res.status(200).send({message: 'Concepto modificado con éxito'});
        }

    } catch (error) {
        res.status(500).send({message: 'Error al modificar el concepto'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await ConceptoCajaDiario.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Concepto eliminado con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar el concepto'});
    }
});

module.exports = router;