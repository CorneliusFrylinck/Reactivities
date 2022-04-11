import React, { Fragment } from "react";
import { Activity } from "../../../app/models/activity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

library.add(faSpinner);

interface Props {
    activity: Activity;
}

export default observer(function ActivityItem({activity} : Props) {
    
    const {activityStore} = useStore();
    const {deleteActivity, deleteItemId, loading} = activityStore;

    return (
        <li key={activity.id} id="activity-item">
            <h2 id="activity-title">{activity.title}</h2>
            <h4 id="activity-date">{activity.date}</h4>
            <div id="activity-description">{activity.description}</div>
            <div id="activity-location">{activity.city}, {activity.venue}</div>
            <div id="space-top"><a id="activity-category">{activity.category}</a></div>
            <Link to={`/activities/${activity.id}`} id="view-btn" href="#">View</Link>
            {loading && activity.id == deleteItemId &&
            <a key={activity.id} className="spin-btn" onClick={() => deleteActivity(activity.id)} id="delete-btn" href="#"><FontAwesomeIcon className="spinner" icon="spinner" /></a>}
            {(! loading || activity.id != deleteItemId ) &&
            <a onClick={() => deleteActivity(activity.id)} id="delete-btn" href="#">Delete</a>}
            
        </li>
    )
})