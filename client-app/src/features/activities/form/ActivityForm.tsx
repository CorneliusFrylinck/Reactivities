import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";

export default observer(function ActivityForm() {

    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();


    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        date: Yup.date().required(),
        category: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required('The activity title is required')
    })


    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!))
        }
    }, [id, loadActivity]);

    function handleSubmit() {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            };
            //createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        }else{
            //updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`))
        } 
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }


    if(loadingInitial) return <LoadingComponent content='Loading activity'/>

    return (
        <Segment clearing>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (  
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='title' placeholder="Title" />
                    <MyTextArea name='description' placeholder="Description" rows={3} />
                    <MyTextInput name='date' placeholder="Date" />
                    <MySelectInput options={categoryOptions} name='category' placeholder="Category" />
                    <MyTextInput name='city' placeholder="City" />
                    <MyTextInput name='venue' placeholder="Venue" />
                    <Button floated='right' positive type='submit' content='Submit' loading={loading} ></Button>
                    <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'></Button>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})