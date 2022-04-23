import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";

export default observer(function ProfilePage() {
    
    const {username} = useParams<{username: string}>();

    return (
        <h1>Profile of {username}</h1>
    )
})