import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Header, Tab, Image } from "semantic-ui-react";
import { Photo, Profile } from "../../app/models/profile";

interface Props {
    profile: Profile 
}

export default observer (function ProfilePhotos({profile} : Props) {
    return (
        <Tab.Pane>
            <Header icon='image' content='photos' />
            <Card.Group itemsPerRow={5}>
                {profile.photos != undefined && profile.photos.length > 0 && profile.photos.map((photo) =>
                    <Card key={photo.id}>
                        <Image src={photo.url || '/assets/user.png'} />
                    </Card>
                )}
            </Card.Group>
        </Tab.Pane>
    )
})