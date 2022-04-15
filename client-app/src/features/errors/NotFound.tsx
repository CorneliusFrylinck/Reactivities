import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export default function NotFound() {
    return (
        <div>
            <div>
                <Icon name="search" />
                Oops - we've looked everywhere but could not find this.
            </div>
            <div>
                <Link to="/activities">Return to activities page</Link>
            </div>
        </div>
    )
}