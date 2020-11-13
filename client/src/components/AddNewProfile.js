import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { postProfile } from "../api/profiles";

const AddNewProfile = () => {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    address: "",
    email: "",
    phone: "",
    gender: "",
    groups: "",
    support_type: ""
  });

  const [profileCreated, setProfileCreated] = useState(null);

  const handleChange = event => {
    const updatedProfileData = {
      ...profileData,
      [event.target.name]: event.target.value
    };

    setProfileData(updatedProfileData);
  };

  const createProfile = () => {
    postProfile(profileData).then(isSuccessful => {
      setProfileCreated(isSuccessful);
    });
  };

  return (
    <Form onSubmit={createProfile}>
      <Form.Field>
        <label htmlFor="first-name">First name</label>
        <input
          id="first-name"
          placeholder="First Name"
          name="firstname"
          value={profileData.firstname}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          placeholder="Last Name"
          name="lastname"
          value={profileData.lastname}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="dob">DOB</label>
        <input
          id="dob"
          type="date"
          placeholder="Date of birth"
          name="dob"
          value={profileData.dob}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          placeholder="Address"
          name="address"
          value={profileData.address}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          name="email"
          value={profileData.email}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="Phone"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="gender">Gender</label>
        <input
          id="gender"
          placeholder="Gender"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="groups">Groups</label>
        <input
          id="groups"
          placeholder="Groups"
          name="groups"
          value={profileData.groups}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="support">Support type</label>
        <input
          id="support"
          placeholder="Support type"
          name="support_type"
          value={profileData.support_type}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Button primary type="submit">
        Add new profile
      </Form.Button>
      { profileCreated === false && <p>Something went wrong when creating the profile. Please try again.</p>}
    </Form>
  );
};

export default AddNewProfile;
