import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

library.add(faUsers);

function App() {
  const {activityStore} = useStore();


  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(uuid());

  useEffect(() => {
    activityStore.loadActivities();
  }, []) //empty arr of dependencies, ensures that rendering happens once instead of an infinite loop

  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading app' />
  }else {
    return (
      <div >
        <header>
          <NavBar />
          <h2 id="icon-container"><FontAwesomeIcon icon={["fas", "users"]} />Reactivities</h2>
          
          <ActivityDashboard />
        </header>
      </div>
    );
  }
  
}

export default observer(App);
