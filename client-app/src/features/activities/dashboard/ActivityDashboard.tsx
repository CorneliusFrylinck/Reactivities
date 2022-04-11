import { observer } from 'mobx-react-lite';
import React from 'react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore

    return (
        <div id="activity-dashboard">
            <ActivityList  />
            <div className='column'>
                {selectedActivity && ! editMode &&
                <ActivityDetails />}
                {editMode &&
                    <ActivityForm />
                }
            </div>
        </div>
    )
})