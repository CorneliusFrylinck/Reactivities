import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid'

library.add(faSpinner);


export default observer (function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore
    const {id} = useParams<{id: string}>();
    
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    function handleInput(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <div className="activityForm">
            <form onSubmit={handleSubmit}>
                <input name="title" onChange={handleInput} value={activity.title} className="opacity-50 margin-1UP-halfLR" placeholder='Title' />
                <textarea name="description" onChange={handleInput} value={activity.description}  className="opacity-50 margin-1UP-halfLR" placeholder='Description' />
                <input name="category" onChange={handleInput} value={activity.category}  className="opacity-50 margin-1UP-halfLR" placeholder='Category' />
                <input name="date" onChange={handleInput} type="date" value={activity.date} className="opacity-50 margin-1UP-halfLR" placeholder='Date' />
                <input name="city" onChange={handleInput} value={activity.city}  className="opacity-50 margin-1UP-halfLR" placeholder='City' />
                <input name="venue" onChange={handleInput} value={activity.venue}  className="opacity-50 margin-1UP-halfLR" placeholder='Venue' />
                <div  className="margin-1UP-halfLR">
                    <input type="button" value='Cancel' />
                    {loading &&
                    <button className="spin-btn" type="submit"><FontAwesomeIcon className="spinner" icon="spinner" /></button>}
                    {! loading &&
                    <button type="submit">Submit</button>}
                </div>
            </form>
        </div>
    )
})