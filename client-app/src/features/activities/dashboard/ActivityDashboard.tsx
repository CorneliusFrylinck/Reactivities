import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore
    

  useEffect(() => {
    activityStore.loadActivities();
  }, []) //empty arr of dependencies, ensures that rendering happens once instead of an infinite loop

  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading app' />
  }

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