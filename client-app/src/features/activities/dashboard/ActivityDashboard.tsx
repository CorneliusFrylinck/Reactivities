import React from 'react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
    deleteItemId: string
}

export default function ActivityDashboard(
                {
                  activities, selectedActivity, selectActivity, cancelSelectActivity
                , editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting, deleteItemId
                } 
                : Props) {
    return (
        <div id="activity-dashboard">
            <ActivityList 
                activities={activities}     
                selectedActivity={selectedActivity}
                selectActivity={selectActivity}
                cancelSelectActivity={cancelSelectActivity}
                deleteActivity={deleteActivity}
                submitting={submitting}
                deleteItemId={deleteItemId}
            />
            <div className='column'>
                {selectedActivity && ! editMode &&
                <ActivityDetails 
                    activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} 
                    openForm={openForm}
                />}
                {editMode &&
                    <ActivityForm 
                        submitting={submitting} closeForm={closeForm} 
                        createOrEdit={createOrEdit} activity={selectedActivity} 
                    />
                }
            </div>
        </div>
    )
}