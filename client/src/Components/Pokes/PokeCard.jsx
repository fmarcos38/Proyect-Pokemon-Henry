import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import './PokeCard.css';
import {deleteP_DB, deleteP_api, getAllP} from '../../Redux/Actions';

export default function PokeCard({id, name, foto, types, createDB}){

    const dispatch = useDispatch();

    const handlerCL = (e) => {
        if(id.length > 6){
           dispatch(deleteP_DB(id));
           alert("Poke eliminado!!");
           dispatch(getAllP())
           //window.location = "http://localhost:3000/home";
        }else{
            dispatch(deleteP_api(id));
        }
    };
    
    return(
        <div className="cont-pokeCard">

            <p className="poke-name">{name}
               <button className="delete-poke" onClick={handlerCL}>x</button>
            </p>

            <NavLink to={`/details/${id}`}>
              <img src={foto} alt={"Img not found"} className={"foto"}/>
            </NavLink>
            
            <label className="label-type">Types: </label>
            {
                types.map(t => {
                    return(
                        <p className="tipo" key={t.name}>{t.name}</p>
                    )
                })

            }
        </div>
    )
}