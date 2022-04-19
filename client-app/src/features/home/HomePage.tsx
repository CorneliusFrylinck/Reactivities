import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function HomePage() {
    const {userStore} = useStore()

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' style={{color: 'white'}}>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome to Reactivities'></Header>
                    <Button as={Link} to='/activities' size="huge" inverted>
                        Take me to the Activities
                    </Button>
                    </>
                ) : (
                    <Button as={Link} to='/login' size="huge" inverted>
                        Login!
                    </Button>
                    )
                }
            </Container>
        </Segment>
    )
})