import React from "react";
import './NotFound.css';
import notfound from '../Images/notF.gif';

export default function NotFound(){
 
    return(
        <div className="notfound-cont">

          <div>
          <h3 className="texto">Poke not found</h3>
          </div>

          <div>       
          <img src={notfound} alt={'not found'} className={'gif-dog'}/>          
          </div>
        
        </div>
    )
}