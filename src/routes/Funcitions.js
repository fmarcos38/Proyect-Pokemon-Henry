const axios = require('axios');
const {Pokemon, Type} = require('../db');


async function getAllPokesApi(){
    let respApi = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=60");
    let pokesApi = respApi.data.results.map(p => axios.get(p.url));//mapeo y le pego a c/url de c/poke
    pokesApi = await Promise.all(pokesApi).then(resp => {
        let poke = resp.map(p => {
            return {
                id: p.data.id,
                name: p.data.forms[0].name.toUpperCase(),
                imagen: p.data.sprites.other.dream_world.front_default,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map(t => t.type)//esto viene Array de objts ->y c/obj tiene una prop type(q es otro obj)con propiedad name
            }
        });
        return poke;//retorno c/poke normalizado
    });
    return pokesApi;//retorno array de pokes
}
async function getAllPokesDB(){
    let pokesDB = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['id','name'],
            through: {
                attributes: []
            }
        }        
    });
    return pokesDB;
}
async function getPokeByName(name){
    let buscaDB = await Pokemon.findAll({
        where: {name: name},
        include: {
            model: Type,
            attributes: ['id','name'],
            through: {
                attributes: []
            }
        }
    });
    //busco en la api
    if(!buscaDB.length){
        //--busco en la api---http://localhost:3001/pokemons?name=bulbasaur
        let buscoPokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);        
        buscoPokeApi = buscoPokeApi.data;
        
        let pokeNormalizado = [{
            id: buscoPokeApi.id,
            name: buscoPokeApi.forms[0].name.toUpperCase(),
            imagen: buscoPokeApi.sprites.other.dream_world.front_default,
            types: buscoPokeApi.types.map(t => t.type)//esto viene Array de objts ->y c/obj tiene una prop type(q es otro obj)con propiedad name
        }];//tiene q ser un array de objeto SINO en el front llega un obj 
        //console.log("PokApi:", pokeNormalizado);
        return pokeNormalizado;
    }
    //console.log("PokeDB:", buscaDB);
    return buscaDB;
}
async function detailsPoke(id){

    if(id.length > 4){
        let detailsDB = await Pokemon.findOne({//si utilizo findOne (me retorna un obj); SI utilizo finAll(me retorn un array) para tener en cuenta lo q llega al front
            where: {id: id},
            include: {
                model: Type,
                attributes: ['id','name'],           
                through: {
                  attributes: []
                } 
            }           
        });
        return detailsDB;
    }else{//--http://localhost:3001/pokemons/details/1
        let apiPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let pokemon = {
         id: apiPoke.data.id,
         name: apiPoke.data.forms[0].name,
         imagen: apiPoke.data.sprites.other.dream_world.front_default,
         hp: apiPoke.data.stats[0].base_stat,
         attack: apiPoke.data.stats[1].base_stat,
         defense: apiPoke.data.stats[2].base_stat,
         speed: apiPoke.data.stats[5].base_stat,
         height: apiPoke.data.height,
         weight: apiPoke.data.weight,       
         types: apiPoke.data.types.map(t => t.type)//no le pongo t.type.name(porq sino no me muestra el nombre en el detalle, ya q el de la DB viene directo)
        };
        return pokemon;       
    }
}
async function postPoke({name,imagen, weight, height, hp, attack, defense, speed, type, createDB }){
    //asigno imagen por defecto
    if(!imagen){
        imagen = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
    }
    //creo poke
    let newPoke = await Pokemon.create({
        name,imagen, weight, height, hp, attack, defense, speed, createDB
    });
    //busco los type
    let typesP = await Type.findAll({
        where:{ name: type}
    });
    //relaciono
    newPoke.addType(typesP);

    return newPoke;
}

async function deletePoke(id){
   let elimP = await Pokemon.destroy({
       where: {id:id}
   });

   return elimP;
}
//--function para Type-----
async function getAllTypes(){
    //--verifico si ya se cargaroin en la DB
    const allT = await Type.findAll({
        attributes: ['id', 'name']
    });
    //--le pego a la pai y me traigo los types       
    if(!allT.length){
        let resp = await axios.get("https://pokeapi.co/api/v2/type");
        let tipos = resp.data.results.map(t => {
           return{
               name: t.name
           } 
        });
        //hago un creat masivo de todos los types , ya q los tengo en un array
        //console.log("T:", tipos);
        Type.bulkCreate(tipos);
         
        let allTypes = await Type.findAll({
            attributes: ['id','name']
        });

        return allTypes;
    }else{
        return allT;
    }

}

module.exports = {
    getAllPokesApi,
    getAllPokesDB,
    getPokeByName,
    detailsPoke,
    postPoke,
    deletePoke,
    getAllTypes
};