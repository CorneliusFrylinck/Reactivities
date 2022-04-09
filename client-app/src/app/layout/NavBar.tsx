import React from 'react';

export default function NavBar() {
    return (
        <div id="nav-parent">
            <ul id="NavBar">
                <li><div id="logo-container"><img id="logo" src="/assets/logo.png" alt="logo"/> <a id="logo-description">Reactivities</a></div></li>
                <li>Activities</li>
                <li><a id="create-btn" href="#">Create Activity</a></li>
            </ul>
        </div>
    )
}