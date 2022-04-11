import { observer } from "mobx-react-lite";
import React from "react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityItem from "./ActivityItem";


export default observer(function ActivityList() {

    const {activityStore} = useStore();

    const {activitiesByDate} = activityStore;

    return (
        <div id="activity-list">
            <ul id="activity-list-container">
                {activitiesByDate.map((activity: Activity) => (
                        <ActivityItem key={activity.id}
                            activity={activity}
                        />
                ))}
            </ul>
        </div>
    )
})