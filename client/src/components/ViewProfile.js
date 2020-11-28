import React, { useState, useEffect } from "react";
import { Button, Card, Divider, Icon, Modal, Header } from "semantic-ui-react";
import { getProfile, deleteProfile } from "../api/profiles";
import { useParams, useHistory } from "react-router-dom";

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
    <Card color="black" textAlign="center" style={{ width: "auto" }}>
      <Card.Content>
        <Card.Header>
          {`${profile.first_name} ${profile.last_name}`}
        </Card.Header>
        <Divider></Divider>
        <Card.Content>
          <Card.Description>
            <Icon name="mail" />
            {profile.email}
          </Card.Description>
          <Card.Description>
            <Icon name="phone" />
            {profile.phone_number}
          </Card.Description>
          <Card.Description>
            <Icon name="address card outline"></Icon>
            {profile.address}
          </Card.Description>
        </Card.Content>
        <Divider></Divider>
        <Card.Content extra>
          {profile.first_name}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </Card.Content>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="black">
            Edit
          </Button>
          <Button basic color="black" onClick={() => setModalStatus(true)}>
            Delete
          </Button>
        </div>
      </Card.Content>
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
    </Card>
  );
};

export default ViewProfile;
