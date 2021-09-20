import React, { useState, useEffect } from "react";
import { postProfile } from "../api/profiles";
import { getNationalities, getGroups, getLanguages } from "../api/profiles";
import Select from "react-select";

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
    languages: "",
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
  const [languages, setLanguages] = useState([]);

  const handleChange = event => {
    updateField(event.target.name, event.target.value);
  };

  const createProfile = event => {
    event.preventDefault();

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
    getNationalities().then(response => {
      setNationalities(response);
    });
    getGroups().then(response => {
      setGroups(response);
    });
    getLanguages().then(response => {
      setLanguages(response);
    });
  }, []);

  const nationalityOptions = nationalities.map(nationality => ({
    key: nationality.id,
    label: nationality.nationality,
    value: nationality.id
  }));

  const groupsOptions = groups.map(group => ({
    key: group.id,
    label: group.group_name,
    value: group.id
  }));

  const languageOptions = languages.map(language => ({
    key: language.id,
    label: language.language,
    value: language.id
  }));

  return (
    <div className="px-10 max-w-4xl mx-auto">
      <form onSubmit={createProfile}>
        <ul className="errors">
          {errors.map(error => (
            <li>
              <p>{error}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Field
              label="First name"
              name="firstname"
              type="text"
              value={profileData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-3">
            <Field
              label="Last name"
              name="lastname"
              type="text"
              value={profileData.lastname}
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
              name="phone"
              type="tel"
              value={profileData.phone}
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
              name="nationality"
              options={nationalityOptions}
              onChange={selected => updateField("nationality", selected.value)}
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
              onChange={selected => updateField("gender", selected.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Date of birth"
              type="date"
              onChange={event =>
                updateField("dob", new Date(event.target.value))
              }
              name="dob"
              value={
                profileData.dob
                  ? profileData.dob.toISOString().substring(0, 10)
                  : ""
              }
            />
          </div>
          <div class="sm:col-span-6">
            <label className="font-semibold text-gray-700" htmlFor="groups">
              Groups
            </label>
            <Select
              id="groups"
              name="groups"
              placeholder="Select groups ..."
              isMulti
              options={groupsOptions}
              onChange={selected =>
                updateField(
                  "groups",
                  selected.map(s => s.value)
                )
              }
            />
          </div>
          <div class="sm:col-span-6">
            <label className="font-semibold text-gray-700" htmlFor="groups">
              Language
            </label>
            <Select
              id="groups"
              name="groups"
              placeholder="Select language ..."
              options={languageOptions}
              onChange={selected => updateField("languages", selected.value)}
            />
          </div>

          <div class="sm:col-span-6">
            <Field
              label="Support type"
              name="support_type"
              value={profileData.support_type}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="profile_type">Profile type</label>
            <Select
              id="profile_type"
              name="profile_type"
              options={profileTypeOptions}
              onChange={selected => updateField("profile_type", selected.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="status">Status</label>
            <Select
              id="status"
              name="status"
              defaultValue={statusOptions[0]}
              options={statusOptions}
              onChange={selected => updateField("status", selected.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Join date"
              type="date"
              onChange={event =>
                updateField("join_date", new Date(event.target.value))
              }
              name="join_date"
              value={profileData.join_date.toISOString().substring(0, 10)}
            />
          </div>
          {profileCreated === false && (
            <p>
              Something went wrong when creating the profile. Please try again.
            </p>
          )}
        </div>
        <div class="pt-5">
          <div class="flex justify-end">
            <button type="submit" class="btn px-3 py-2">
              Add new profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Field = ({ label, name, type, value, onChange }) => (
  <>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="form-input shadow-sm focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </>
);

export default AddNewProfile;
