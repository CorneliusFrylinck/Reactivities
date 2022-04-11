import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
            if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || ! activity) return <LoadingComponent />;

    return (
        <div id="activity-details">
            <img src={`/assets/categoryImages/${activity.category}.jpg`} />
            <h2 style={{marginLeft: "1rem"}} id="activity-title">{activity.title}</h2>
            <h4 style={{marginLeft: "1rem"}} id="activity-date">{activity.date}</h4>
            <div  style={{marginLeft: "1rem"}}id="activity-description">{activity.description}</div>
            <div id="activity-detail-buttons">
                <Link to={`/manage/${activity.id}`} className="btn" id="edit-activity-btn">Edit</Link>
                <Link to="/activities" className="btn" id="cancel-activity-btn">Cancel</Link>
            </div>
        </div>
    )
})
