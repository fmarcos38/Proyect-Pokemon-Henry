import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";
import SearchBar from './SearchBar/SearchBar';

export default function NavBar(){

    return(
        <div className="navbar">
            <nav>
                <ul className="lista">
                    <li className="items">
                        <NavLink to={'/home'}>Home</NavLink>
                        <NavLink to={'/create'}>Create poke</NavLink>
                        <NavLink to={'/modif'}>Modif Poke</NavLink>
                        <NavLink to={'/about'}>About</NavLink>
                    </li>
                    <div className="searchbar">
                    <SearchBar />
                    </div>
                </ul>
            </nav>
        </div>
    )
}