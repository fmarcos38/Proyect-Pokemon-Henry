const express = require('express');
const { getAllPokesApi, getAllPokesDB, getPokeByName, detailsPoke, postPoke, modifPoke, 
        deletePoke, getAllTypes } = require('./Funcitions');
    const {Pokemon} = require('../db');
const router = express.Router();

//--me traigo todos los pokes de la api + DB y si viene name por query realiz la busq
router.get('/', async(req,res)=>{
    const { name } = req.query;

    if(name){        
        try {
            let buscoPoke = await getPokeByName(name);
            
            res.json(buscoPoke);
        } catch (error) {
            res.send().status(404);
            //res.send({message: "El poke no existe, por ese nombre!!"})//con este no me renderiza el comp Not found            
        }     
    }else{
        try {
            
        let pokesApi = await getAllPokesApi();
        let pokesDB = await getAllPokesDB();
        let allPokes = pokesApi.concat(pokesDB);

        res.json(allPokes);
   
        } catch (error) {
            res.send({message: "Error al traer los pokes!!"})            ;
        }
    }
});

//--busco por id, para traer detalle
router.get('/details/:id', async(req,res) =>{
    const {id} = req.params;

    try {
        let pokeID = await detailsPoke(id);
        res.json(pokeID);
    } catch (error) {
        res.send({message: "No existe Poke para ese ID"});
    }
});

//--creo poke---
router.post('/create', async(req,res)=>{
    const data = req.body;

    try {
        let newP = await postPoke(data);
        
        res.json(newP); //es igual a 1
    } catch (error) {
        res.send({message: "Error al crear"}).status(400);
    }
    
})

//--modif poke
router.put('/modif', async(req,res)=>{
    const{ name,hp, attack } = req.body;

    let actualizado = await Pokemon.update({
        hp: hp,
        attack: attack,
    },{
        where: {name: name}
    });

    res.json(actualizado);// va a ser igual a 1, la cant de elment modif
})

//--delete poke
router.delete('/delete/:id', async(req,res)=>{
    const {id} = req.params;

    try {
        let deleteP = await deletePoke(id);

        res.json(deleteP);
    } catch (error) {
        res.send({message: "Error al eliminar"}).status(400);
    }
})
module.exports = router;