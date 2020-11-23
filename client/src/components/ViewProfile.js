import React, { useState, useEffect } from "react";
import { Container, Button, Card, Divider, Icon } from "semantic-ui-react";
import { getProfile } from "../api/profiles";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  const [profile, setProfile] = useState([]);

  let { profileId } = useParams();

  useEffect(() => {
    getProfile(profileId).then(response => {
      setProfile(response);
      document.title = `${response.first_name} ${response.last_name}  Profile`;
    });
  }, [profileId]);

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
          <Button basic color="black">
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ViewProfile;
