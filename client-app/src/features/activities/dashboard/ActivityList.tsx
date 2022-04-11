import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityItem from "./ActivityItem";


export default observer(function ActivityList() {

    const {activityStore} = useStore();

    const {groupedActivities} = activityStore;

    return (
        <>
        <div id="activity-list">
        {groupedActivities.map(([group, activities]) => (
            <Fragment key={group}>
                <div style={{color: "teal"}}>
                    {group}
                </div>
                    <ul id="activity-list-container">
                        {activities.map((activity: Activity) => (
                                <ActivityItem key={activity.id}
                                    activity={activity}
                                />
                        ))}
                    </ul>
            </Fragment>
        ))}
        </div>
        </>
    )
})