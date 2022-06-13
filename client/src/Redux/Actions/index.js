import axios from 'axios';
import { LOADING, SEARCH_P, GET_ALL_P, GET_ALL_T, POKE_DETAIL, RESET_DETAIL,DELETE_P_API,FILTRO_AZ_ZA, 
         FILTRO_HP, FILTRO_ORIGEN, FILTRO_TYPES, RESET_F} from './ActionsTypes';

export function searchP(name){
    return async function(dispatch){
        dispatch({type: LOADING});

        let resp = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        dispatch({type: SEARCH_P, payload: resp.data});
    }
}
export function getAllP(){
    return async function(dispatch){
        dispatch({type: LOADING});

        let resp = await axios.get("http://localhost:3001/pokemons");
        dispatch({type: GET_ALL_P, payload: resp.data});//resp.data porq le pego con axios
    }
}
export function getAllT(){
    return async function(dispatch){
        let resp = await fetch("http://localhost:3001/types");
        resp = await resp.json();
        dispatch({type: GET_ALL_T, payload: resp});
    }
}
export function pokeDetail(id){
    return async function(dispatch){
        let resp = await fetch(`http://localhost:3001/pokemons/details/${id}`);
        resp = await resp.json();
        dispatch({type: POKE_DETAIL, payload: resp});
    }
}
export function resetDetail(){
    return{ type: RESET_DETAIL}
}
export function postPoke(data){
    return async function(dispatch){
        /* let resp = */ await axios.post("http://localhost:3001/pokemons/create", data);
    }
}
export function modifP(info){
    return async function(){
        await axios.put("http://localhost:3001/pokemons/modif", info)
       
   }
}
//---deletes-----
export function deleteP_DB(id){
    return async function(){
        await axios.delete(`http://localhost:3001/pokemons/delete/${id}`);
    }
}
export function deleteP_api(id){
    return {
        type: DELETE_P_API,
        payload: id
    }
}

//-----filtros----
export function filtroAZ_ZA(filtro){
    return{
        type:FILTRO_AZ_ZA,
        payload: filtro
    }
}
export function filtroHP(filtro){
    return{
        type: FILTRO_HP,
        payload: filtro
    }
}
export function filtroOrigen(filtro){
    return{
        type: FILTRO_ORIGEN,
        payload: filtro
    }
}
export function filtroTypes(tipos){
    return{
        type: FILTRO_TYPES,
        payload: tipos
    }
}
export function resetF(){
    return{
        type: RESET_F,
    }
}
//-----------------------------------