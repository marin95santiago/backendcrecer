const { Router } = require('express');
const router = Router();
const { isAuth, isAdmin } = require('../util/tokenHandler');

const Bank = require('../models/bank');

router.get('/admin', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await Bank.find({idEnterprice: req.user.idEnterprice});
        if(response){
            res.send(response)
        }
    } catch (error) {
        res.status(203).json({message: 'Error al buscar bancos'});
    }
});

router.get('/client', isAuth, async (req, res) => {
    try {
        const response = await Bank.find({idEntidad: req.user.idEntidad});
        if(response){
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(203).json({message: 'Error al buscar bancos'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const { idEntidad, bank, numberAccount, typeAccount } = req.body;
        const bankFound = await Bank.findOne({idEntidad: idEntidad, numberAccount: numberAccount});
        if(bankFound)
            return res.status(203).json({message: `El banco ${numberAccount} ya existe`});
            
        const newBank = new Bank ({
            idEnterprice: req.user.idEnterprice,
            idEntidad,
            bank,
            numberAccount,
            typeAccount
        });
        const response = await newBank.save();
        if(response){
            res.status(200).json({message: `Banco ${numberAccount} creado con éxito`});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al crear banco'});
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await Bank.findOneAndDelete({_id: req.params.id});
        if(response){
            res.status(200).json({message: 'Banco eliminado con éxito'});
        }
    } catch (error) {
        res.status(203).json({message: 'Error al eliminar banco'});
    }
});

module.exports = router;