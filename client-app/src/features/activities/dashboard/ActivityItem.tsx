import React, { Fragment } from "react";
import { Activity } from "../../../app/models/activity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faSpinner);

interface Props {
    activity: Activity;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
    deleteItemId: string;
}

export default function ActivityItem({activity, selectActivity, deleteActivity, submitting, deleteItemId} : Props) {
    return (
        <li key={activity.id} id="activity-item">
            <h2 id="activity-title">{activity.title}</h2>
            <h4 id="activity-date">{activity.date}</h4>
            <div id="activity-description">{activity.description}</div>
            <div id="activity-location">{activity.city}, {activity.venue}</div>
            <div id="space-top"><a id="activity-category">{activity.category}</a></div>
            <a onClick={() => selectActivity(activity.id)} id="view-btn" href="#">View</a>
            {submitting && activity.id == deleteItemId &&
            <a key={activity.id} className="spin-btn" onClick={() => deleteActivity(activity.id)} id="delete-btn" href="#"><FontAwesomeIcon className="spinner" icon="spinner" /></a>}
            {(! submitting || activity.id != deleteItemId ) &&
            <a onClick={() => deleteActivity(activity.id)} id="delete-btn" href="#">Delete</a>}
            
        </li>
    )
}