import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Form, Dropdown } from "semantic-ui-react";
import { postProfile } from "../api/profiles";
import { getNationalities, getGroups } from "../api/profiles";

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
    nationality: "",
    join_date: new Date()
  });
  const [errors, setErrors] = useState([]);
  const [profileCreated, setProfileCreated] = useState(null);
  const [nationalities, setNationalities] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleChange = event => {
    updateField(event.target.name, event.target.value);
  };

  const createProfile = () => {
    let errs = [];
    if (profileData.firstname.length === 0) {
      errs.push("First name cannot be empty");
    }
    if (profileData.lastname.length === 0) {
      errs.push("Last name cannot be empty");
    }
    if (profileData.phone.length < 10) {
      errs.push("Phone number must have at least 10 digits");
    }
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    postProfile(profileData).then(isSuccessful => {
      setProfileCreated(isSuccessful);
    });
    setErrors([]);
  };

  const handleDropdownAndDateChange = (event, data) => {
    updateField(data.name, data.value);
  };

  const nationalityHandler = (event, data) => {
    const selectedNationality = data.value;
    setProfileData({ ...profileData, nationality: selectedNationality });
  };

  const groupsHandler = (event, data) => {
    const selectedGroups = data.value;
    setProfileData({ ...profileData, groups: selectedGroups });
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

  const genderOptions = [
    { key: "male", value: "male", text: "Male" },
    { key: "female", value: "female", text: "Female" },
    { key: "other", value: "other", text: "Other" },
    { key: "not_provided", value: "not_provided", text: "Not provided" }
  ];

  useEffect(() => {
    getNationalities().then(response => {
      setNationalities(response);
    });
    getGroups().then(response => {
      setGroups(response);
    });
  }, []);

  const nationalityOptions = nationalities.map(nationality => ({
    key: nationality.id,
    text: nationality.nationality,
    value: nationality.id
  }));

  const groupsOptions = groups.map(group => ({
    key: group.id,
    text: group.group_name,
    value: group.id
  }));

  return (
    <Form onSubmit={createProfile}>
      <ul class="errors">
        {errors.map(error => (
          <li>
            <p>{error}</p>
          </li>
        ))}
      </ul>
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
        <Dropdown
          id="gender"
          placeholder="Gender"
          name="gender"
          value={profileData.gender}
          onChange={handleDropdownAndDateChange}
          fluid
          selection
          options={genderOptions}
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
        <label for="nationality">Nationality</label>
        <Dropdown
          id="nationality"
          name="nationality"
          value={profileData.nationality}
          fluid
          selection
          options={nationalityOptions}
          onChange={nationalityHandler}
          placeholder="Nationality"
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
