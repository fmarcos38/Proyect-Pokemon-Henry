import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Pokes.css';
import {getAllP, getAllT,filtroAZ_ZA, filtroHP, filtroOrigen, filtroTypes, resetF} from '../../Redux/Actions';
import Loading from '../Loading/Loading';
import PokeCard from "./PokeCard";
import NotFound from "../NotFound/NotFound";
import Pagination from "../Pagination/Pagination";

export default function Pokes(){

    const allP = useSelector(state => state.resultsPokes);
    const allT = useSelector(state => state.allTypes);
    const dispatch = useDispatch();
    const load = useSelector(state => state.load);
    //----paginations------
    const [currentpage, setCurrentPage] = useState(1);

    const pokesXpage = 12;
    const lastIndexPage = pokesXpage * currentpage;//ejm 12*1=12....para la pag 1.
    const firstIndexPage = lastIndexPage - pokesXpage;//ejm 12-12=0...para la pag 1.
    const fraccionPokes = allP.slice(firstIndexPage, lastIndexPage);//asigno de a 12 elemnts
    const pagination = (numPag) => {//funcion para ir actualiz la pagina
        setCurrentPage(numPag);
    }
    //----------------------------------------------------------------------------------------
    //---FILTROS-----
    const handlerCL = (e) => {
        switch(e.target.id){
            case 'az':
                dispatch(filtroAZ_ZA('az'));
                setCurrentPage(1);
                break;
            case 'za':
                dispatch(filtroAZ_ZA('za'));
                setCurrentPage(1);
                break;
            case 'maxHp':
                dispatch(filtroHP('max'));
                break;
            case 'minHp':
                dispatch(filtroHP('min'));
                setCurrentPage(1);
                break;
            case 'db':
                dispatch(filtroOrigen('db'));
                setCurrentPage(1);
                break;
            case 'api':
                dispatch(filtroOrigen('api'));
                setCurrentPage(1);
                break;
            case 'tipos':
                dispatch(filtroTypes(e.target.value));
                setCurrentPage(1);
                break;
            case 'reset':
                dispatch(resetF());
                setCurrentPage(1);
                break;
            default:
                break;
        }
    }
    //--------------
    useEffect(()=>{
        dispatch(getAllP());
        dispatch(getAllT());
    },[dispatch]);


    return(
        <div className="cont-gral-pokes">
            {//si laod es true cargo component loading
                load ? 
                (<div>
                    <Loading/>
                </div>) 
                : 
                (<div className="cont-cards">
                    {/*---FILTROS--------- */}
                    <div className="cont-filtros">
                        <button className="btn-filtro" id={'az'} onClick={handlerCL}>A-Z</button>
                        <button className="btn-filtro" id={'za'} onClick={handlerCL}>Z-A</button>
                        <button className="btn-filtro" id={'maxHp'} onClick={handlerCL}>+ HP</button>
                        <button className="btn-filtro" id={'minHp'} onClick={handlerCL}>- HP</button>
                        <button className="btn-filtro" id={'db'}  onClick={handlerCL}>Pokes DB</button>
                        <button className="btn-filtro" id={'api'} onClick={handlerCL}>Pokes API</button>
                        <select value={'default'} id={'tipos'} onChange={handlerCL} className="select-filtro">
                            <option value={'default'} disabled>Types</option>
                            {
                                allT[0] ? allT.map(t => {
                                    return(
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                    ) 
                                 }) : <option>Loading...</option>                   
                            }
                        </select>
                        <button className="btn-filtro" id={'reset'} onClick={handlerCL}>Reset Filters</button>
                    </div>                                      
                    {/*-------------------------------- */}
                    <div className="cards">
                        {  
                          fraccionPokes[0] ?
                          fraccionPokes.map(p => {
                                return(
                                    <div key={p.id} >
                                        <PokeCard key={p.id} id={p.id} name={p.name} foto={p.imagen} 
                                            types={p.types} createInDB={p.createDB}
                                        />
                                </div>
                                )
                            }) : (<div className="notfound">
                                    <NotFound/>
                                </div>)
                        }
                    </div>                        
                                                 
                    <div className="pag">                    
                      <Pagination pokesXpage={pokesXpage} pokes={allP.length} pagination={pagination} currentpage={currentpage}/>
                    </div> 
                </div>)
            
            }
                    
        </div> 
    )
}