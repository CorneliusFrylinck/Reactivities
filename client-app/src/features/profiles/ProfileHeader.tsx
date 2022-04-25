import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { User } from "../../app/models/user";
import { store } from "../../app/stores/store";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile} : Props) {
    const user = store.userStore.user;
    var hideFollowBtn = user?.username !== profile.username;
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile?.image || '/assets/user.png'} />
                            <Item.Content verticalAlign="middle">
                                <Header as={profile?.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followersCount} />
                        <Statistic label='Following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                   <FollowButton profile={profile} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
})