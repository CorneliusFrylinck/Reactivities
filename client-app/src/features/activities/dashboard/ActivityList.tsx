import React from "react";
import { Activity } from "../../../app/models/activity";
import ActivityItem from "./ActivityItem";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
    deleteItemId: string;
}

export default function ActivityList(
    {activities, selectedActivity, selectActivity, cancelSelectActivity, deleteActivity, submitting, deleteItemId} 
: Props) {
    return (
        <div id="activity-list">
            <ul id="activity-list-container">
                {activities.map((activity: Activity) => (
                        <ActivityItem deleteItemId={deleteItemId} submitting={submitting} activity={activity} selectActivity={selectActivity} deleteActivity={deleteActivity} />
                ))}
            </ul>
        </div>
    )
}