import React from "react";
import { Activity } from "../../../app/models/activity";
import ActivityItem from "./ActivityItem";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList(
    {activities, selectedActivity, selectActivity, cancelSelectActivity, deleteActivity} 
: Props) {
    return (
        <div id="activity-list">
            <ul id="activity-list-container">
                {activities.map((activity: Activity) => (
                        <ActivityItem activity={activity} selectActivity={selectActivity} deleteActivity={deleteActivity} />
                ))}
            </ul>
        </div>
    )
}