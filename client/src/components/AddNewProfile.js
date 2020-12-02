import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Form, Dropdown } from "semantic-ui-react";
import { postProfile } from "../api/profiles";
import { getNationalities } from "../api/profiles";

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
    support_type: "",
    profile_type: "",
    status: "new",
    nationality: "",
    join_date: new Date()
  });
  const [errors, setErrors] = useState([]);
  const [profileCreated, setProfileCreated] = useState(null);
  const [nationalities, setNationalities] = useState([]);

  const handleChange = event => {
    updateField(event.target.name, event.target.value);
  };

  const createProfile = () => {
    let errs = [];
    if (profileData.firstname.length === 0) {
      errs.push(<li><p>First name cannot be empty</p></li>);
    }
    if (profileData.lastname.length === 0) {
      errs.push(<li><p>Last name cannot be empty</p></li>);
    }
    if (profileData.phone.length < 10) {
      errs.push(<li><p>Phone number must be 10 characters</p></li>);
    }
    if (profileData.address.length === 0) {
      errs.push(<li><p>Address cannot be empty</p></li>);
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
console.log("errors",errors)//to remove
  const handleDropdownAndDateChange = (event, data) => {
    updateField(data.name, data.value);
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
    {key: "male", value: "male", text: "Male"},
    {key: "female", value: "female", text: "Female"},
    {key: "other", value: "other", text: "Other"},
    {key: "not_provided", value: "not_provided", text: "Not provided"}
  ];
 
  useEffect(() => {
     getNationalities().then(response => {
      console.log("res",response)
      setNationalities(response); 
    });
  }, []);

  const nationalityOptions = nationalities.map(nationality => ({
    key: nationality.id,
    text: nationality.nationality,
    value: nationality.nationality
  }));
console.log(nationalities)//to remove
console.log(profileData)//to remove
console.log("options", nationalityOptions)
  return (
      
    <Form onSubmit={createProfile}>
      <ul class="errors">
                <p>{ errors }</p>
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
          fluid selection options = {genderOptions}
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
        <label>Nationality</label>
      <Dropdown
            // button
            // labeled
            // icon="world"
            // className="icon"
            name="nationality"
            value={profileData.nationality}
            fluid
            selection
            options={nationalityOptions}
            onChange={handleDropdownAndDateChange}
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
