import React, { useEffect, useState } from "react";
import './CreatePoke.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from "react-redux";
import { getAllP, getAllT, postPoke } from "../../Redux/Actions";

//---funcion validadora de errores en los inputs-----
function validators(input){
    const errors = {};

    if(!input.name){errors.name = "Pleace, name is required";}
    if(!/^[a-zA-Z\s]*$/.test(input.name)){errors.name = "Pleace, enter only letters";}
    if(!input.hp){errors.hp = "Pleace, hp is required";} 
    if(!input.attack){errors.attack = "Pleace, attack is required";}
    if(!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(input.imagen)){errors.imagen = "No es una URL"};

    if(input.hp < 0){errors.hp = "No se permiten Numeros Negativos";} 
    if(input.attack < 0){errors.attack = "No se permiten Numeros Negativos";} 
    if(input.defense < 0){errors.defense = "No se permiten Numeros Negativos";}  
    if(input.speed < 0){errors.speed = "No se permiten Numeros Negativos";} 
    if(input.height < 0){errors.height = "No se permiten Numeros Negativos";} 
    if(input.weight < 0){errors.weight = "No se permiten Numeros Negativos";}   

    if(!/^[0-100]*$/.test(input.hp)){errors.hp = "No se permiten Letras, solo n° 0a100";} 
    /* if(!/^[0-100]*$/.test(input.attack)){errors.attack = "No se permiten Letras, solo n° 0a100";} 
    if(!/^[0-100]+$/.test(input.defense)){errors.defense = "No se permiten Letras, solo n° 0a100";} 
    if(!/^[0-100]+$/.test(input.speed)){errors.speed = "No se permiten Letras, solo n° 0a100";} 
    if(!/^[0-100]+$/.test(input.height)){errors.height = "No se permiten Letras, solo n° 0a100";} 
    if(!/^[0-100]+$/.test(input.weight)){errors.weight = "No se permiten Letras, solo n° 0a100";}  */
    
    return errors;
}
export default function CreatePoke(){

    const initialState = { name: "", imagen:"", hp: "", attack: "", defense: "", speed: "", 
                           height: "", weight: "", type: []};
    const [input, setInput] = useState(initialState);
    const [error, setError] = useState(initialState);
    const allT = useSelector(state => state.allTypes);
    const allP = useSelector(state => state.allPokes);
    const dispatch = useDispatch();

    let buscoPoke = allP.find(p => p.name.toLowerCase() === input.name.toLowerCase());
  
    useEffect(()=>{
        dispatch(getAllT());
        dispatch(getAllP());
    },[dispatch]);

    const handlerCH = (e) => {
        e.preventDefault();        
        if(e.target.id === 'tipitos'){
            //verifico si ya se ingresó ese type
            let tipos = input.type.find(t => t === e.target.value);
            if(tipos){alert("Ya se ingresó ese type")}
            else{setInput({...input, type: [...input.type, e.target.value]});}            
        }else{
            setInput({...input, [e.target.id]: e.target.value});
            setError(validators({...input, [e.target.id]: e.target.value}));
        }
    };
    const handlerDelete = (elemnt) => {
         setInput({...input, type: input.type.filter(t => t !== elemnt)})
    };
    const handlerS = (e) => {
        e.preventDefault();        
        if((input.hp || input.attack || input.defense || input.speed || input.height || input.weight) < 0){
            alert("No se permiten Numeros Negativos...corrija por favor!!"); 
        }
        if(!input.name || !input.hp || !input.defense || !input.speed || !input.height || !input.weight || !input.type){
                 alert("Enter All dates!!");                 
        }else if(buscoPoke){
          alert("El Poke ya existe!!");
          setInput({name: "", imagen:"", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", type: []});
        }else{           
            dispatch(postPoke(input));
            alert("Poke created !!");
            setInput({name: "", imagen:"", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", type: []});
            dispatch(getAllP());
        }
    };
    return(
        <div>
            <NavBar/>

            <div className="cont-gral-create">

                <form onSubmit={handlerS} className="cont-formulario">
                  
                    <div className="grupo1">

                        <div className="nombre">
                            <label className="label">Name: </label>
                            <input className={error.name ? "errorInput" : "itemInput"} type={'text'} id={'name'} value={input.name} onChange={handlerCH}/>
                            {error.name && (<div><span className="span-error">{error.name}</span></div>)}
                            {/*muestro msj SI el poke a crear ya existe */}
                            {buscoPoke && (<div><span className="span-error">El Poke ya existe!! Ing otro nomb!!</span></div>)}
                        </div>

                        <div className="hp">
                            <label className="label">Hp: </label>
                            <input className={error.hp ? "errorInput" : "itemInput"} type={'number'} min={'1'} max={'100'} value={input.hp} id={'hp'} onChange={handlerCH} />
                               {error.hp && (<div><span className='span-error'>{error.hp}</span></div>)}
                        </div>

                        <div className="imagen-div">
                           <label className="label">Imagen: </label>
                           <input className={"itemInput"} type={'text'} value={input.imagen} id={'imagen'} onChange={handlerCH} />
                           {error.imagen && (<div><span className="span-error">{error.imagen}</span></div>)}
                        </div>

                        <div className="attack">
                            <label className="label-atack">Attack: </label>
                            <input className={error.attack ? "errorInput" : "itemInput"} type={'number'} min={'1'} max={'100'} value={input.attack} id={'attack'} onChange={handlerCH} />
                            {error.attack && (<div><span className='span-error'>{error.attack}</span></div>)}
                        </div>

                    </div>

                    <div className="grupo2">
                        <div className="defense">
                         <label className="label">Defense: </label>
                         <input className={"itemInput"} type={'number'} min={'1'} max={'100'} value={input.defense} id={'defense'} onChange={handlerCH} />
                        </div>

                        <div className="speed">
                          <label className="label">Speed: </label>
                          <input className={"itemInput"} type={'number'} min={'1'} max={'100'} value={input.speed} id={'speed'} onChange={handlerCH} />
                        </div>

                        <div className="heigth">
                          <label className="label">Height: </label>
                          <input className={error.height ? "errorInput" : "itemInput"} type={'number'} min={'1'} max={'100'} value={input.height} id={'height'} onChange={handlerCH} />
                             {error.height && (<span className='span-error'>{error.height}</span>)}
                        </div>                 

                        <div className="weight">
                          <label className="label">Weight: </label>
                          <input className={error.weight ? "errorInput" : "itemInput"} type={'number'} min={'1'} max={'100'} value={input.weight} id={'weight'} onChange={handlerCH} />
                          {error.weight && (<span className='span-error'>{error.weight}</span>)}
                        </div>
                    </div>

                    <div className="grupo3">
                    
                    <div>
                        <label className="label">Type: </label><br></br>
                        <select className="select-types-create"  onChange={handlerCH} id={'tipitos'}>
                            { 
                                allT[0] ? allT.map((t,i) => {
                                    return(
                                        <option key={i} value={t.name}>{t.name}</option>
                                    )
                                }) : <option>Loading...</option>
                            }
                        </select>
                    </div>
                        {/* muestra los types seleccionads*/}
                    <div >
                        {
                                
                            input.type.map((el, index) => {
                                return (
                                    <div key={index} >
                                        <button type="button" className="btn-delete" onClick={() => handlerDelete(el)}>x</button>
                                        <span className="nameType">{el}</span>
                                    </div>
                                );
                            }) 
                                
                        }
                    </div>
                    </div>

                    <div className="div-btn-create">
                       <input className="btn-create" type={'submit'} value={'Create Poke'} />
                    </div>

                </form>
            </div>
        </div>
    )
}