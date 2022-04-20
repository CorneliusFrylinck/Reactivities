import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email(),
        displayName: Yup.string().required('DisplayName is required'),
        password: Yup.string().required('Password is required'),
        username: Yup.string().required('Username is required')
    })


    return (
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(err => 
                setErrors({error: 'There was a problem registering the user'}))}
                validationSchema={validationSchema}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign="center" />
                    <MyTextInput name="displayName" placeholder="DisplayName" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password"/>
                    <ErrorMessage
                        name='error' render={() => 
                            <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>
                        }
                    />
                    <Button disabled={isSubmitting || !isValid || !dirty} loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})