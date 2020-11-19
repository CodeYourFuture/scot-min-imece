import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "semantic-ui-react";
import { getProfile } from "../api/profiles";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  const [profile, setProfile] = useState([]);

  let { profileId } = useParams();

  useEffect(() => {
    getProfile(profileId).then(response => {
      setProfile(response);
      document.title =
        response.first_name + " " + response.last_name + " Profile";
    });
    console.log(profileId);
  }, [profileId]);
  return (
    <Container text>
      <Card color="black">
        <Card.Content>
          <Card.Header>
            {profile.first_name + " " + profile.last_name}
          </Card.Header>
          <Card.Meta>{profile.email}</Card.Meta>
          <Card.Description>{profile.address}</Card.Description>
          <Card.Content extra>
            {profile.first_name} is a good software developer
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
    </Container>
  );
};

export default ViewProfile;
