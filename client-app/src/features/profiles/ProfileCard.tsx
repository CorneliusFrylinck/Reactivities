import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile;
}

export default observer (function ProfileCard({profile} : Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                {profile.bio !== null &&
                <Card.Description style={{ wordWrap: 'break-word', overflow: 'hidden', wordBreak: "break-all", textOverflow: 'ellipsis', whiteSpace: "nowrap"}}>{profile.bio && profile.bio.length < 50 ? profile.bio : profile.bio + "..."}</Card.Description>
                }
            </Card.Content>
            <Card.Content extra>
                <Icon name="user"/>
                {profile.followersCount} {profile.followersCount !== 1 ? 'followers' : 'follower'}
            </Card.Content>
                <FollowButton profile={profile} />
        </Card>
    )
})