import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

library.add(faSpinner);


export default observer (function ActivityForm() {

    const {activityStore} = useStore();

    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInput(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <div className="activityForm">
            <form onSubmit={handleSubmit}>
                <input name="title" onChange={handleInput} value={activity.title} className="margin-1UP-halfLR" placeholder='Title' />
                <textarea name="description" onChange={handleInput} value={activity.description}  className="margin-1UP-halfLR" placeholder='Description' />
                <input name="category" onChange={handleInput} value={activity.category}  className="margin-1UP-halfLR" placeholder='Category' />
                <input name="date" onChange={handleInput} type="date" value={activity.date} className="margin-1UP-halfLR" placeholder='Date' />
                <input name="city" onChange={handleInput} value={activity.city}  className="margin-1UP-halfLR" placeholder='City' />
                <input name="venue" onChange={handleInput} value={activity.venue}  className="margin-1UP-halfLR" placeholder='Venue' />
                <div  className="margin-1UP-halfLR">
                    <input onClick={closeForm} type="button" value='Cancel' />
                    {loading &&
                    <button className="spin-btn" type="submit"><FontAwesomeIcon className="spinner" icon="spinner" /></button>}
                    {! loading &&
                    <button type="submit">Submit</button>}
                </div>
            </form>
        </div>
    )
})