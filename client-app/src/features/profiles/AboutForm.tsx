import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, FormField, Grid, Header, Icon, Item, Label, Segment, Tab } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import MySelectInput from "../../app/common/form/MySelectInput";
import { categoryOptions } from "../../app/common/options/CategoryOptions";
import MyDateInput from "../../app/common/form/MyDateInput";
import { ActivityFormValues } from "../../app/models/activity";
import { ProfileFormValues } from "../../app/models/profile";

export default observer(function ActivityForm() {

    const history = useHistory();
    const { profileStore, userStore : {user} } = useStore();
    const {setDetails, loadingProfile, profile, isEditing, toggleEditing} = profileStore;
    


    const [profileInit, setProfileInit] = useState<ProfileFormValues>(new ProfileFormValues( {
        displayName: profile!.displayName, bio: profile?.bio
    }));

    const validationSchema = Yup.object({
        displayName: Yup.string().required('The display name is a required field')
    })


    function handleFormSubmit(profile: ProfileFormValues) {
        setDetails(profile)
    }


    if(loadingProfile) return <LoadingComponent content='Loading activity'/>

    return (
        <Tab.Pane>
            <Header as='h2' color="black">
                <Icon name="user" color="black" />
                {`About ${profile!.displayName}`}
            </Header>
            { profile?.username == user?.username && <Button onClick={() => toggleEditing()} style={{position: "absolute", top: 10, right: 15}} basic content={ isEditing ? "Cancel" : "Edit Profile"} />}
            { profile?.username == user?.username && isEditing ? (
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={profileInit} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (  
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='displayName' placeholder="Display Name" />
                    <MyTextArea rows={3} name="bio" placeholder="Bio" />
                    <Button 
                        disabled={isSubmitting || !isValid || !dirty} 
                        floated='right' 
                        positive 
                        type='submit' 
                        content='Update profile' 
                        loading={isSubmitting} 
                    ></Button>
                    <Button onClick={() => toggleEditing()} floated='right' type='button' content='Cancel'></Button>
                </Form>
                )}
            </Formik>
            ): (
                <Label style={{backgroundColor: "white", fontSize: 13, whiteSpace: "pre-line"}} content={profile?.bio || "Nothing to say..."} />
            )
            }
        </Tab.Pane>
    )
})