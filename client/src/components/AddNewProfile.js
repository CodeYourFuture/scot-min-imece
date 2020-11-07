import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

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

  const handleChange = event => {
    const updatedProfileData = {
      ...profileData,
      [event.target.name]: event.target.value
    };

    setProfileData(updatedProfileData);
  };

  const createProfile = () => {
    console.log("Do something with the form values...");
    console.log(`Username = ${profileData.firstname}`);
    console.log(`Email = ${profileData.email}`);
  };

  return (
    <Form>
      <Form.Field>
        <label>First name</label>
        <input
          placeholder="First Name"
          name="firstname"
          value={profileData.firstname}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          name="lastname"
          value={profileData.lastname}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>DOB</label>
        <input
          type="date"
          placeholder="Date of birth"
          name="dob"
          value={profileData.dob}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <input
          placeholder="Address"
          name="address"
          value={profileData.address}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={profileData.email}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Phone</label>
        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Gender</label>
        <input
          placeholder="Gender"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Groups</label>
        <input
          placeholder="Groups"
          name="groups"
          value={profileData.groups}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Support type</label>
        <input
          placeholder="Support type"
          name="support_type"
          value={profileData.support_type}
          onChange={handleChange}
        />
      </Form.Field>
      <Button type="submit" onClick={createProfile}>
        Add new profile
      </Button>
    </Form>
  );
};

export default AddNewProfile;
