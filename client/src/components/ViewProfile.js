import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import {
  Button,
  Card,
  Divider,
  Icon,
  Modal,
  Header,
  Segment,
  Grid,
  Label
} from "semantic-ui-react";
import { getProfile, deleteProfile } from "../api/profiles";
import { useParams, useHistory, Link } from "react-router-dom";

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
        <Grid.Column floated="right" width={4} className="right-column">
          <Button>Edit</Button>
          <Button onClick={() => setModalStatus(true)}>Delete</Button>
        </Grid.Column>
      </Grid>
      <Segment className="main-segment">
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={5} className="status">
              <Label>Status:</Label>
              <Label>{profile.first_name}</Label>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h2">{`${profile.first_name} ${profile.last_name}`}</Header>
            </Grid.Column>
            <Grid.Column width={5} className="volunteering">
              <Label>Volunteering:</Label> <Label>{profile.first_name}</Label>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row centered>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Header as="h3">Personal Details</Header>
                  <Card.Content>
                    <Label>Age:</Label> {profile.first_name}
                    <br />
                    <Label>Nationality:</Label>
                    {profile.first_name}
                    <br />
                    <Label>Gender:</Label>
                    {profile.gender}
                    <br />
                    <Label>Languages:</Label>
                    {profile.first_name}
                    <br />
                    <Label>Immigration Status:</Label>
                    {profile.first_name}
                    <br />
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Header as="h3">Contact Details</Header>
                  <Card.Content>
                    <Label>
                      <Icon name="mail" />
                    </Label>
                    {profile.email}
                    <br />
                    <br />
                    <Label>
                      <Icon name="phone" />
                    </Label>
                    {profile.phone_number}
                    <br />
                    <br />
                    <Label>
                      <Icon name="address card outline"></Icon>
                    </Label>
                    {profile.address}
                    <br />
                    <br />
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Header as="h3">MIN Details</Header>
                  <Card.Content>
                    <Label>Groups:</Label>
                    <p>{profile.email}</p>
                    <Label>How did they hear about us:</Label>
                    <p>{profile.email}</p>
                    <Label>Date they joined:</Label>
                    <p>{profile.email}</p>
                    <Label>Notes:</Label>
                    <p>{profile.notes}</p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
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
