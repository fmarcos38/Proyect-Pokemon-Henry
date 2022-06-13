const express = require('express');
const router = express.Router();
const {Type} = require('../db');
const { getAllTypes } = require('./Funcitions');

router.get('/', async(req,res)=>{
    try {
        let tipos = await getAllTypes();

        res.json(tipos);
    } catch (error) {
        res.send({message: "Error al traer los types"}).status(400);
    }
})

module.exports = router;