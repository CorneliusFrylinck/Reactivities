import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <h2>Go to <Link to='/activities'>Activities</Link></h2>
        </div>
    )
}