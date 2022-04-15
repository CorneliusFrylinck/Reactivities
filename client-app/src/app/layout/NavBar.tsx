import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';


export default function NavBar() {

    const {activityStore} = useStore();

    return (
        <div id="nav-parent">
            <ul id="NavBar">
                <li><NavLink to='/' activeClassName='currentLink' className="white" id="logo-container"><img id="logo" src="/assets/logo.png" alt="logo"/> <div id="logo-description">Reactivities</div></NavLink></li>
                <li><NavLink to="/activities" activeClassName='currentLink' className="white" >Activities</NavLink></li>
                <li><NavLink to="/errors" activeClassName='currentLink' className="white" >Erros</NavLink></li>
                <li><NavLink activeClassName='currentLink' className="white create-btn" to="/createActivity">Create Activity</NavLink></li>
            </ul>
        </div>
    )
}