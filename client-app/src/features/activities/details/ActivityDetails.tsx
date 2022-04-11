import { observer } from "mobx-react-lite";
import React from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails() {

    const {activityStore} = useStore();

    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    if (!activity) return <LoadingComponent />;

    return (
        <div id="activity-details">
            <img src={`/assets/categoryImages/${activity.category}.jpg`} />
            <h2 style={{marginLeft: "1rem"}} id="activity-title">{activity.title}</h2>
            <h4 style={{marginLeft: "1rem"}} id="activity-date">{activity.date}</h4>
            <div  style={{marginLeft: "1rem"}}id="activity-description">{activity.description}</div>
            <div id="activity-detail-buttons"><a onClick={() => openForm(activity.id)} className="btn" id="edit-activity-btn">Edit</a><a onClick={cancelSelectedActivity} className="btn" id="cancel-activity-btn">Cancel</a></div>
        </div>
    )
})
