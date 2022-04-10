import React from 'react';

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <div id="nav-parent">
            <ul id="NavBar">
                <li><div id="logo-container"><img id="logo" src="/assets/logo.png" alt="logo"/> <a id="logo-description">Reactivities</a></div></li>
                <li>Activities</li>
                <li><a onClick={openForm} id="create-btn" href="#">Create Activity</a></li>
            </ul>
        </div>
    )
}