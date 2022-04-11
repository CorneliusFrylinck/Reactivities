import { observer } from "mobx-react-lite";
import React from "react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityItem from "./ActivityItem";


export default observer(function ActivityList() {

    const {activityStore} = useStore();

    const {activities} = activityStore;

    return (
        <div id="activity-list">
            <ul id="activity-list-container">
                {activities.map((activity: Activity) => (
                        <ActivityItem 
                            activity={activity}
                        />
                ))}
            </ul>
        </div>
    )
})