import React, { Fragment, SyntheticEvent } from "react";
import { Activity } from "../../../app/models/activity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faLocation, faClock, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

library.add(faSpinner);
library.add(faMapMarker);
library.add(faClock);

interface Props {
    activity: Activity;
}

export default observer(function ActivityItem({activity} : Props) {
    
    const {activityStore} = useStore();
    const {deleteActivity, deleteItemId, loading} = activityStore;

    function handleActivityDelete(id: string) {
        deleteActivity(id)
    }

    return (
        <li key={activity.id} id="activity-item">
            <div className="meeting-header">
                <img src="/assets/user.png" alt="" className="small-round-img" />
                <div className="meeting-header-text">
                    <h2 id="activity-title">{activity.title}</h2>
                    <h4 id="activity-date">Hosted by Bob</h4>
                </div>
            </div>
            <div className="meeting-details">
                <FontAwesomeIcon icon="clock" />{activity.date} &nbsp;
                <FontAwesomeIcon icon="map-marker" />{activity.venue}
            </div>
            <div className="attendees">
                Attendees go here
            </div>
            <div className="meeting-footer">
                <div id="activity-description">{activity.description}</div>
                <div className="buttons">
                    <Link to={`/activities/${activity.id}`} id="view-btn" href="#">View</Link>
                    {loading && activity.id == deleteItemId &&
                    <a key={activity.id} className="spin-btn" onClick={() => handleActivityDelete(activity.id)} id="delete-btn" href="#"><FontAwesomeIcon className="spinner" icon="spinner" /></a>}
                    {(! loading || activity.id != deleteItemId ) &&
                    <a onClick={() => deleteActivity(activity.id)} id="delete-btn" href="#">Delete</a>}
                </div>
            </div>
        </li>
    )
        /*<li key={activity.id} id="activity-item">
            <h2 id="activity-title">{activity.title}</h2>
            <h4 id="activity-date">{activity.date}</h4>
            <div id="activity-description">{activity.description}</div>
            <div id="activity-location">{activity.city}, {activity.venue}</div>
            <div id="space-top"><a id="activity-category">{activity.category}</a></div>
            <Link to={`/activities/${activity.id}`} id="view-btn" href="#">View</Link>
            {loading && activity.id == deleteItemId &&
            <a key={activity.id} className="spin-btn" onClick={() => handleActivityDelete(activity.id)} id="delete-btn" href="#"><FontAwesomeIcon className="spinner" icon="spinner" /></a>}
            {(! loading || activity.id != deleteItemId ) &&
            <a onClick={() => deleteActivity(activity.id)} id="delete-btn" href="#">Delete</a>}
            
        </li>
    )*/
})