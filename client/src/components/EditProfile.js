import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Form, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom"
import { updateProfileByProfileId, getProfile, getNationalities } from "../api/profiles";

const EditProfile = ({match}) => {
  const profileId = match.params.profileId;
  const [loaded, setLoaded]=useState(false)
  const [profileData, setProfileData] = useState(null );
  const [errors, setErrors] = useState([]);
  const [profileUpdated, setProfileUpdated] = useState(null);
  const [nationalities, setNationalities] = useState([]);

  const handleChange = (event) => {
    updateField(event.target.name, event.target.value);
  };

  const updateProfile = () => {
    let errs = [];
    if (profileData.firstname.length === 0) {
      errs.push('First name cannot be empty');
    }
    if (profileData.lastname.length === 0) {
      errs.push('Last name cannot be empty');
    }
    if (profileData.phone.length < 10) {
      errs.push('Phone number must have at least 10 digits');
    }
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    updateProfileByProfileId(profileData, profileId).then((isSuccessful) => {
      setProfileUpdated(isSuccessful);
    });
    setErrors([]);
  };
  
  const handleDropdownAndDateChange = (event, data) => {
    updateField(data.name, data.value);
  };

  const updateField = (name, value) => {
    const updatedProfileData = {
      ...profileData,
      [name]: value,
    };
    setProfileData(updatedProfileData);
  };

  const profileTypeOptions = [
    { key: "volunteer", value: "volunteer", text: "Volunteer" },
    { key: "service user", value: "service_user", text: "Service user" },
  ];

  const statusOptions = [
    { key: "new", value: "new", text: "New" },
    { key: "active", value: "active", text: "Active" },
    { key: "inactive", value: "inactive", text: "Inactive" },
  ];

  const genderOptions = [
    { key: "male", value: "male", text: "Male" },
    { key: "female", value: "female", text: "Female" },
    { key: "other", value: "other", text: "Other" },
    { key: "not_provided", value: "not_provided", text: "Not provided" },
  ];

  useEffect(() => {
    getNationalities().then((response) => {
      setNationalities(response);
    });
  getProfile(profileId).then((profile) => {
    setProfileData({...profile} )
    setLoaded(true)
    }, 
()=>setLoaded(true)
  );
  }, [profileId]);

  const nationalityOptions = nationalities.map((nationality) => ({
    key: nationality.id,
    text: nationality.nationality,
    value: nationality.nationality,
  }));

console.log(profileData)
if (loaded){ 
  return  profileData !==null ? (
    <Form onSubmit={updateProfile}>
      <ul className="errors">
      {errors.map(error => <li><p>{error}</p></li>)}
      </ul>
      <Form.Field>
        <label htmlFor="first-name">First name</label>
        <input
          id="first-name"
          placeholder="First Name"
          name="firstname"
          value={profileData.first_name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          placeholder="Last Name"
          name="lastname"
          value={profileData.last_name}
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
          value={profileData.date_of_birth}
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
        <label htmlFor="nationality">Nationality</label>
        <Dropdown
        id="nationality"
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
        <label htmlFor="join-date">Join date</label>
        {/* <SemanticDatepicker
          id="join-date"
          onChange={handleDropdownAndDateChange}
          name="join_date"
          value={profileData.join_date}
        />  */}
      </Form.Field> 
      <Button primary >
        Update profile
      </Button>
      <Button primary as={Link} to={ `/profiles/${profileId}`}>
        Cancel
      </Button>
      {profileUpdated === false && (
        <p>Something went wrong when creating the profile. Please try again.</p>
      )}
    </Form>
    ) :(
    <p>No such profile exist</p>
  );
    } else return <p>Loading</p>;
};

export default EditProfile;
