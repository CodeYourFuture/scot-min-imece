import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Icon,
  Modal,
  Header,
  Segment,
  Grid,
  Label,
  List
} from "semantic-ui-react";
import { getProfile, deleteProfile } from "../api/profiles";
import { useParams, useHistory } from "react-router-dom";
import "../styles/profile.css";

const ViewProfile = () => {
  const [profile, setProfile] = useState([]);
  const [delProfile, setDelProfile] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

  let { profileId } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (delProfile === false) {
      getProfile(profileId).then(response => {
        setProfile(response);
        document.title = `${response.first_name} ${response.last_name}  Profile`;
      });
    } else {
      deleteProfile(profileId);
      history.goBack();
    }
  }, [profileId, delProfile, history]);

  return (
    <>
      <Grid className="first-grid">
        <Grid.Column floated="left" width={5} className="left-column">
          <Label as="a" onClick={() => history.goBack()}>
            <Icon
              name="arrow alternate circle left"
              className="left-arrow"
              size="large"
            />
            Go back
          </Label>
        </Grid.Column>
        <Grid.Column
          floated="right"
          width={4}
          className="right-column"
          textAlign="right"
        >
          <Button>Edit</Button>
          <Button onClick={() => setModalStatus(true)}>Delete</Button>
        </Grid.Column>
      </Grid>
      <Segment className="main-segment">
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={5} textAlign="left">
              <Label>Status:</Label>
              <Label className="dark-yellow">{profile.status}</Label>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h2">{`${profile.first_name} ${profile.last_name}`}</Header>
            </Grid.Column>
            <Grid.Column width={5} textAlign="right">
              <Label>Volunteering:</Label>{" "}
              <Label className="reddish">
                {profile.type === "volunteer" ? "Yes" : "No"}
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row centered>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Header as="h3">Personal Details</Header>
                  <List>
                    <List.Item>
                      <Label>Age:</Label> {profile.first_name}
                    </List.Item>
                    <List.Item>
                      <Label>Nationality:</Label>
                    </List.Item>
                    <List.Item>
                      <Label>Gender:</Label> {profile.gender}
                    </List.Item>
                    <List.Item>
                      <Label>Languages:</Label>
                    </List.Item>
                    <List.Item>
                      <Label>Immigration Status:</Label> {profile.asylum_status}
                    </List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card className="contact-card">
                <Card.Content>
                  <Header as="h3">Contact Details</Header>
                  <Card.Content>
                    <List>
                      <List.Item>
                        <Label>
                          <Icon name="mail" />
                        </Label>
                        {profile.email}
                      </List.Item>
                      <List.Item>
                        <Label>
                          <Icon name="phone" />
                        </Label>
                        {profile.phone_number}
                      </List.Item>
                      <List.Item>
                        <Label>
                          <Icon name="address card outline" />
                        </Label>
                        {profile.address}
                      </List.Item>
                    </List>
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Header as="h3" textAlign="center">
                    MIN Details
                  </Header>
                  <Card.Content>
                    <Label>Groups:</Label>
                    <p>{profile.groups && profile.groups.join(", ")}</p>
                    <Label>How did they hear about us:</Label>
                    <p>{profile.how_did_they_hear}</p>
                    <Label>they joined:</Label>
                    <p>
                      {new Date(profile.join_date).toString().substring(4, 15)}
                    </p>
                    <Label>Notes:</Label>
                    <p>{profile.notes}</p>
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Modal open={modalStatus} size="small">
            <Header content="!Delete this profile" />
            <Modal.Content>
              <p>
                Are you sure you want to delete this profile? Once deleted, it
                cannot be recovered.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic negative onClick={() => setModalStatus(false)}>
                <Icon name="cancel" /> No
              </Button>
              <Button
                basic
                positive
                onClick={() => {
                  setDelProfile(true);
                }}
              >
                <Icon name="check" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid>
      </Segment>
    </>
  );
};

export default ViewProfile;
