import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    

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
                <h2>Activity Filters</h2>
            </div>
        </div>
    )
})