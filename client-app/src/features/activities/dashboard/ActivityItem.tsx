import React, { Fragment } from "react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityItem({activity, selectActivity, deleteActivity} : Props) {
    return (
        <li key={activity.id} id="activity-item">
            <h2 id="activity-title">{activity.title}</h2>
            <h4 id="activity-date">{activity.date}</h4>
            <div id="activity-description">{activity.description}</div>
            <div id="activity-location">{activity.city}, {activity.venue}</div>
            <div id="space-top"><a id="activity-category">{activity.category}</a></div>
            <a onClick={() => selectActivity(activity.id)} id="view-btn" href="#">View</a>
            <a onClick={() => deleteActivity(activity.id)} id="delete-btn" href="#">Delete</a>
        </li>
    )
}