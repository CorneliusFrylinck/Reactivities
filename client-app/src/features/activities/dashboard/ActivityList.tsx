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
                <div className="group-text">
                    {group}
                </div>
                    {activities.map((activity: Activity) => (
                        <ul id="activity-list-container">
                            <ActivityItem key={activity.id}
                                activity={activity}
                            />
                        </ul>
                    ))}
            </Fragment>
        ))}
        </div>
        </>
    )
})