import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="home">
            <div className="home-header">
                <div className="flex-row">
                    <img id="logo" src="/assets/logo.png" alt="logo"/> <div id="logo-description">Reactivities</div>
                </div>
                <h2>Welcome to Reactivities</h2>
                <Link className="activities-link" to='/activities'>Take me to the Activities!</Link>
            </div>
        </div>
    )
}