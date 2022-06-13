import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ModifPoke.css'
import {getAllP, modifP, pokeDetail, resetDetail} from '../../Redux/Actions';
import NavBar from '../NavBar/NavBar';

function validator(input){

    const errors = {};

    if(!input.hp){errors.hp = "Pleace, hp is required";} 
    if(!/^[0-9]+$/.test(input.hp)){errors.hp = "Pleace, enter only Numbers";}
    if(!input.attack){errors.attack = "Pleace, attack is required";} 

    return errors;
}

export default function ModifPoke(){

    const initialState = {name: "", hp: "", attack: ""};
    const [input, setInput] = useState(initialState);
    const [error, setError] = useState(initialState);

    const allP = useSelector(state => state.allPokes);
    const pokesDB = allP.filter(p => p.createDB === true);
    const dispatch = useDispatch();
    const pokeD = useSelector(state => state.pokeDetails);

    useEffect(()=>{
        dispatch(getAllP());

        return ()=> dispatch(resetDetail());
    },[dispatch])

    const handlerCH = (e) => {
        if(e.target.id === 'pokes'){
            dispatch(pokeDetail(e.target.value));
        }else{
            setInput({...input, [e.target.id]: e.target.value});
            setError(validator({...input, [e.target.id]: e.target.value}))
        }
    };
    const handlerS = (e) => {
        e.preventDefault();

        if(!input.hp || !input.attack){
            alert("Faltan datos!! HP o ATTACK")
        }else{
            dispatch(modifP(input));
            setInput({name: "", hp: "", attack: ""});            
                 
            alert("Se modif con exito");
        }
    };

    return(
        <div className="cont-gral-put">
            <NavBar/>

            <div className="grupo1-modif">
              <form onSubmit={handlerS}>
                    <div>
                        <label className="lab-modif">Name</label>
                        {input.name = pokeD.name}
                        <input className={"itemInputM"} type={'text'} id={'name'} 
                            onChange={handlerCH} value={input.name}/>
                    </div> 

                    <div className="div-hp">
                       <label className="lab-modif">HP: </label>
                       <input className={error.hp ? "errorInputM" : "itemInputM"} type={'number'} value={input.hp} onChange={handlerCH} id={'hp'} min='0' max='100'/>
                       {error.hp && (
                           <div><span className="span-error-M">{error.hp}</span></div>
                       )}
                    </div>

                    <div className="div-attack">
                      <label className="lab-modif">Attack</label>
                       <input className={error.hp ? "errorInputM" : "itemInputM"} type={'number'} value={input.attack} onChange={handlerCH} id={'attack'} min='0' max='100'/>
                       {error.attack && (
                           <div><span className="span-error-M">{error.attack}</span></div>
                       )}
                    </div>
                     
                     <div className="div-btn">
                         <input className="btn-modif" type={'submit'} value={'Modif Poke'}/>
                     </div>
              </form>
            </div>

            <div className="grupo2-modif">
                <label className="lab-pokes">Seleccione el Poke a modif:</label>
                
                <select onChange={handlerCH} id='pokes' className="select-modif">
                    <option>Pokes:</option>
                    {
                        pokesDB.length ?
                        pokesDB.map(p => {
                            return(
                                <option key={p.id} value={p.id}>{p.name}</option>
                            )
                        }) : <option>NO hay pokes para modif</option>
                    }
                </select>
            </div>
            
            {/*muestro los datos del poke a modif */}            
            {
                pokeD.id && (
                    <div className="grupo3-modif">
                        <p className="data">Name: {pokeD.name}</p>
                        <p className="data">Hp: {pokeD.hp}</p>
                        <p className="data">Attack: {pokeD.attack}</p>
                        <p className="data">Defense: {pokeD.defense}</p>
                        <p className="data">Speed: {pokeD.speed}</p>
                        <p className="data">Height: {pokeD.height}</p>
                        <p className="data">Weight: {pokeD.weight}</p>
                        <label className="data">Types: </label>
                        {
                            pokeD.types &&
                            pokeD.types.map(t => {
                                return(
                                    <div className="tipo-m" key={t.id}>
                                        <p className="data">{t.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            } 

        </div>
    )
}