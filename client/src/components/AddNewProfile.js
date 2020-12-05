import React, { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Form, Dropdown } from "semantic-ui-react";
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
    groups: [],
    support_type: "",
    profile_type: "",
    status: "new",
    join_date: new Date()
  });

  const [profileCreated, setProfileCreated] = useState(null);

  const handleChange = event => {
    updateField(event.target.name, event.target.value);
  };

  const createProfile = () => {
    postProfile(profileData).then(isSuccessful => {
      setProfileCreated(isSuccessful);
    });
  };

  const handleDropdownAndDateChange = (event, data) => {
    updateField(data.name, data.value);
  };

  const groupsHandler = (event, data) => {
    const selectedGroups = data.value;
    profileData.groups = selectedGroups;
  };

  const updateField = (name, value) => {
    const updatedProfileData = {
      ...profileData,
      [name]: value
    };
    setProfileData(updatedProfileData);
  };

  const profileTypeOptions = [
    { key: "volunteer", value: "volunteer", text: "Volunteer" },
    { key: "service user", value: "service_user", text: "Service user" }
  ];

  const statusOptions = [
    { key: "new", value: "new", text: "New" },
    { key: "active", value: "active", text: "Active" },
    { key: "inactive", value: "inactive", text: "Inactive" }
  ];

  const groupsOptions = [
    { key: 1, value: 1, text: "MIN Voices" },
    { key: 2, value: 2, text: "Oasis Women Group" },
    { key: 3, value: 3, text: "Men Group" },
    { key: 4, value: 4, text: "Family Group" },
    { key: 5, value: 5, text: "Gardening Group" },
    { key: 6, value: 6, text: "Joyous Choir" },
    { key: 7, value: 7, text: "ESOL" },
    { key: 8, value: 8, text: "Volunteer" },
    { key: 9, value: 9, text: "Knit for Unity" },
    { key: 10, value: 10, text: "Echo Dance Project" }
  ];

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
        <label>Groups</label>
        <Dropdown
          multiple
          fluid
          selection
          options={groupsOptions}
          onChange={groupsHandler}
          name="groups"
          placeholder="Groups"
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
      <Form.Field>
        <label>Profile type</label>
        <Dropdown
          onChange={handleDropdownAndDateChange}
          name="profile_type"
          value={profileData.profile_type}
          placeholder="Select profile type"
          fluid
          selection
          options={profileTypeOptions}
        />
      </Form.Field>
      <Form.Field>
        <label>Status</label>
        <Dropdown
          onChange={handleDropdownAndDateChange}
          name="status"
          value={profileData.status}
          placeholder="Select status"
          fluid
          selection
          options={statusOptions}
        />
      </Form.Field>
      <Form.Field>
        <label for="join-date">Join date</label>
        <SemanticDatepicker
          id="join-date"
          onChange={handleDropdownAndDateChange}
          name="join_date"
          value={profileData.join_date}
        />
      </Form.Field>
      <Form.Button primary type="submit">
        Add new profile
      </Form.Button>
      {profileCreated === false && (
        <p>Something went wrong when creating the profile. Please try again.</p>
      )}
    </Form>
  );
};

export default AddNewProfile;
