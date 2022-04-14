import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import Calendar from "react-calendar";

library.add(faFilter);

export default function ActivityFilters() {
    return (
        <div className="filter">
            <div className="filter-panel">
                <div className="filter-header">
                    <FontAwesomeIcon icon={faFilter} />&nbsp;
                    Filters
                </div>
                <ul className="filter-options">
                    <li className="filter-option">All Activities</li>
                    <li className="filter-option">I'm going</li>
                    <li className="filter-option">I'm hosting</li>
                </ul>
            </div>
            <Calendar />
        </div>
    )
}