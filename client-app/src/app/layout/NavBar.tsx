import React from 'react';
import { useStore } from '../stores/store';


export default function NavBar() {

    const {activityStore} = useStore();

    return (
        <div id="nav-parent">
            <ul id="NavBar">
                <li><div id="logo-container"><img id="logo" src="/assets/logo.png" alt="logo"/> <a id="logo-description">Reactivities</a></div></li>
                <li>Activities</li>
                <li><a onClick={() => activityStore.openForm()} id="create-btn" href="#">Create Activity</a></li>
            </ul>
        </div>
    )
}