const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const Enterprice = require('../models/enterprice');

router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await Enterprice.find();
        if(response){
            res.send(response)
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar empresa'});
    }
});

router.get('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await Enterprice.findOne({_id: req.params.id});
        if(response){
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({message: 'Error al buscar empresa'});
    }
});

router.post('/new/enterprice/dev', isAuth, isAdmin, async (req, res) => {
    try {
        const { name, nit, bossName, bossLastName, document, country, address, phone, email } = req.body;
        const newEnterprice = new Enterprice ({
            name,
            nit,
            bossName,
            bossLastName,
            document,
            country,
            address,
            phone,
            email
        });
        const response = await newEnterprice.save();
        if(response){
            res.status(200).send({message: 'Empresa creada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al crear empresa'});
    }
});

router.put('/update/enterprice/dev/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const { name, nit, bossName, bossLastName, document, country, address, phone, email } = req.body;
        const response = await Enterprice.findOneAndUpdate({_id: req.params.id}, {
            name,
            nit,
            bossName,
            bossLastName,
            document,
            country,
            address,
            phone,
            email
        });

        if(response){
            res.status(200).send({message: 'Empresa actualizada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar empresa'});
    }
});

router.delete('/delete/enterprice/dev/:id', isAuth, async (req, res) => {
    try {
        const response = await Enterprice.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).send({message: 'Empresa eliminada con éxito'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar empresa'});
    }
});

module.exports = router;
