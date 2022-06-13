import React from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';


export default function LandingPage(){

    return(
        <div className='cont-gnral-landing'>
                        
            <div className='texto-landing'>
                <h1 className='msaj'>Enter the world of pokes...!!</h1>
                
                <br></br> 
                
                <Link to="/home">
                    <button className='btn'>Let 's Go!!</button>
                </Link>
            </div>

        </div>
    )
}