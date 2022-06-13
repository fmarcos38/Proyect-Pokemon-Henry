import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './PokeDetails.css';
import {pokeDetail, resetDetail} from '../../Redux/Actions'
import NavBar from '../NavBar/NavBar';
import Loading from '../Loading/Loading';

export default function PokeDetails(){
    
    const pokeD = useSelector(state => state.pokeDetails);
    const dispatch = useDispatch();
    const { id } = useParams();  //let id_poke = props.match.params.id 

    useEffect(() => {
        dispatch(pokeDetail(id));
        
        return () => dispatch(resetDetail());//willUnmount
    }, [dispatch, id]);
    /* console.log("id:", id);
    console.log("poke:", pokeD); */
    
    //datos a mostrar en el detalle -> id,name,imagen,hp,attack,defense,speed,height,weight,types
    return(
        pokeD.id ?
        <div className='cont-gral-det'>
            <NavBar/>
            
            <div className='cont-detail'>
               
                <div className='group1'>
                   <p className='text-D'>ID: {pokeD.id}</p>
                   <p className='text-D'>Name: {pokeD.name.toUpperCase()}</p>
                </div>
               
               <div className='imagenP'>
                   <img src={pokeD.imagen} alt='Not found' className='imagen-poke'/>
               </div>
               
                <div className='group2'>
                 <p className='text-D'>HP: {pokeD.hp}</p>
                 <p className='text-D'>Attack: {pokeD.attack}</p>
                 <p className='text-D'>Defense: {pokeD.defense}</p>
                 <p className='text-D'>Speed: {pokeD.speed}</p>
                 <p className='text-D'>Heigth: {pokeD.height}</p>
                 <p className='text-D'>Weight: {pokeD.weight}</p>
                </div>

                <label className='tipos'>Types: </label>
                <div className='tipos-poke'>                  
                   {
                     pokeD.types.map((t) => {
                         return (
                             <div key={t.id}>
                               <span className='tipos-poke'>{t.name}</span> 
                             </div>
                                                         
                            );
                        })
                   }
                </div>   
               
            </div>            

        </div> : <Loading/>
    )
}