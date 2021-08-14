import React, { useState, useEffect } from "react";
import Field from "./Field";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  updateProfileByProfileId,
  getProfile,
  getNationalities,
  getGroups
} from "../api/profiles";

const EditProfile = ({ match }) => {
  const profileId = match.params.profileId;
  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState();
  const [errors, setErrors] = useState([]);
  const [nationalities, SetNationalities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleChange = event => {
    updateField(event.target.name, event.target.value);
  };

  const updateProfile = event => {
    event.preventDefault();
    let errs = [];
    if (profileData.first_name.length === 0) {
      errs.push("First name cannot be empty");
    }
    if (profileData.last_name.length === 0) {
      errs.push("Last name cannot be empty");
    }
    if (profileData.phone_number && profileData.phone_number.length < 10) {
      errs.push("Phone number must have at least 10 digits");
    }
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    updateProfileByProfileId(profileData, profileId).then(result => {
      setIsUpdated(result);
    });
    setErrors([]);
  };

  const updateField = (name, value) => {
    const updatedProfileData = {
      ...profileData,
      [name]: value
    };
    setProfileData(updatedProfileData);
  };

  const profileTypeOptions = [
    { key: "service user", value: "service_user", label: "Service user" },
    { key: "volunteer", value: "volunteer", label: "Volunteer" }
  ];

  const statusOptions = [
    { key: "new", value: "new", label: "New" },
    { key: "active", value: "active", label: "Active" },
    { key: "inactive", value: "inactive", label: "Inactive" }
  ];

  const genderOptions = [
    { key: "male", value: "male", label: "Male" },
    { key: "female", value: "female", label: "Female" },
    { key: "other", value: "other", label: "Other" },
    { key: "not_provided", value: "not_provided", label: "Not provided" }
  ];

  useEffect(() => {
    getGroups().then(response => {
      setGroups(response);
    });
    getNationalities().then(response => {
      SetNationalities(response);
    });
    getProfile(profileId).then(
      profile => {
        setProfileData({ ...profile });
        setLoaded(true);
      },
      () => setLoaded(true)
    );
  }, [profileId]);

  const groupsOptions = groups.map(group => ({
    key: group.id,
    label: group.group_name,
    value: group.id
  }));

  const nationalityOptions = nationalities.map(nationality => ({
    key: nationality.id,
    label: nationality.nationality,
    value: nationality.id
  }));

  console.log(profileData);
  if (loaded) {
    return profileData !== null ? (
      <div className="px-10 max-w-4xl mx-auto">
        <form onSubmit={updateProfile}>
          <ul className="errors">
            {errors.map((error, index) => (
              <li key={index}>
                <p>{error}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Field
                label="First name"
                name="first_name"
                type="text"
                value={profileData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-3">
              <Field
                label="Last name"
                name="last_name"
                type="text"
                value={profileData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-6">
              <Field
                label="Address"
                name="address"
                type="text"
                value={profileData.address}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-3">
              <Field
                label="Email address"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-3">
              <Field
                label="Phone"
                name="phone_number"
                type="tel"
                value={profileData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                className="font-semibold text-gray-700"
                htmlFor="nationality"
              >
                Nationality
              </label>
              <Select
                id="nationality"
                name="nationality_id"
                options={nationalityOptions}
                defaultValue={nationalityOptions.find(
                  option => option.value === profileData.nationality_id
                )}
                onChange={selected =>
                  updateField("nationality_id", selected.value)
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-gray-700" htmlFor="gender">
                Gender
              </label>
              <Select
                id="gender"
                name="gender"
                options={genderOptions}
                defaultValue={genderOptions.find(
                  option => option.value === profileData.gender
                )}
                onChange={selected => updateField("gender", selected.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Date of birth"
                type="date"
                onChange={event =>
                  updateField("date_of_birth", event.target.value)
                }
                name="date_of_birth"
                value={
                  profileData.date_of_birth
                    ? new Date(profileData.date_of_birth)
                        .toISOString()
                        .substring(0, 10)
                    : ""
                }
              />
            </div>
            <div className="sm:col-span-6">
              <label className="font-semibold text-gray-700" htmlFor="groups">
                Groups
              </label>
              <Select
                id="groups"
                name="groups"
                placeholder="Select groups ..."
                isMulti
                options={groupsOptions}
                defaultValue={groupsOptions.filter(option =>
                  profileData.groups.find(group => group === option.label)
                )}
                onChange={selected =>
                  updateField(
                    "groups",
                    selected.map(s => s.value)
                  )
                }
              />
            </div>
            <div className="sm:col-span-6">
              <Field
                label="Support type"
                name="support_type"
                value={profileData.support_type}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="type">Profile type</label>
              <Select
                id="type"
                name="type"
                options={profileTypeOptions}
                defaultValue={profileTypeOptions.find(
                  option => option.value === profileData.type
                )}
                onChange={selected => updateField("type", selected.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="status">Status</label>
              <Select
                id="status"
                name="status"
                defaultValue={statusOptions.find(
                  option => option.value === profileData.status
                )}
                options={statusOptions}
                onChange={selected => updateField("status", selected.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Join date"
                type="date"
                onChange={event => {
                  console.log(event.target.value);
                  updateField("join_date", event.target.value);
                }}
                name="join_date"
                value={
                  profileData.join_date
                    ? new Date(profileData.join_date)
                        .toISOString()
                        .substring(0, 10)
                    : ""
                }
              />
            </div>
            {profileData === false && (
              <p>
                Something went wrong when creating the profile. Please try
                again.
              </p>
            )}
          </div>
          <div className="pt-5 flex justify-end">
            <Link to={`/profiles/${profileId}`}>
              <button type="button" className="btn px-6 py-3">
                Cancel
              </button>
            </Link>
            <button type="submit" className="btn px-4 py-3 ml-4">
              Update profile
            </button>
          </div>
        </form>
      </div>
    ) : (
      <p>No such profile exist</p>
    );
  } else return <p>Loading</p>;
};

export default EditProfile;
