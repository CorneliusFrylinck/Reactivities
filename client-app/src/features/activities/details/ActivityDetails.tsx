import React from "react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm} : Props) {
    return (
        <div id="activity-details">
            <img src={`/assets/categoryImages/${activity.category}.jpg`} />
            <h2 style={{marginLeft: "1rem"}} id="activity-title">{activity.title}</h2>
            <h4 style={{marginLeft: "1rem"}} id="activity-date">{activity.date}</h4>
            <div  style={{marginLeft: "1rem"}}id="activity-description">{activity.description}</div>
            <div id="activity-detail-buttons"><a onClick={() => openForm(activity.id)} className="btn" id="edit-activity-btn">Edit</a><a onClick={cancelSelectActivity} className="btn" id="cancel-activity-btn">Cancel</a></div>
        </div>
    )
}
