import React, { useState, useEffect } from "react";
import { postProfile, getProfile, getProfileByEmail } from "../api/profiles";
import { getNationalities, getGroups } from "../api/profiles";
import Select from "react-select";
import { validateInput } from "../utils/validateInput";

const AddNewProfile = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    email: "",
    phone_number: "",
    gender: "",
    groups: [],
    support_type: "",
    type: "",
    status: "new",
    nationality_id: "",
    join_date: new Date().toISOString().substring(0, 10)
  });
  const [errors, setErrors] = useState([]);
  const [profileCreated, setProfileCreated] = useState(null);
  const [nationalities, setNationalities] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleChange = event => {
    updateField(event.target.name, event.target.value);
  };

  const createProfile = event => {
    event.preventDefault();
    //
    let errorsList = [...validateInput(profileData)];
    if (errorsList.length > 0) {
      setErrors(errorsList);
      return;
    } else {
      setErrors([]);
      getProfileByEmail(profileData.email).then(data => {
        if (data) {
          setErrors([...[], "duplicate"]);
        } else {
          postProfile(profileData).then(isSuccessful => {
            setProfileCreated(isSuccessful);
            return;
          });
        }
        console.log(data);
      });
    }
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
  console.log(errors);
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
              id="nationality_id"
              name="nationality_id"
              options={nationalityOptions}
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
              onChange={selected => updateField("gender", selected.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Date of birth"
              type="date"
              onChange={event =>
                updateField("date_of_birth", new Date(event.target.value))
              }
              name="date_of_birth"
              value={
                profileData.date_of_birth
                  ? profileData.date_of_birth.toISOString().substring(0, 10)
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
              onChange={selected => updateField("type", selected.value)}
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
                updateField(
                  "join_date",
                  new Date(event.target.value).toISOString().substring(0, 10)
                )
              }
              name="join_date"
              value={profileData.join_date}
            />
          </div>
          {profileCreated === false && (
            <p>
              Something went wrong when creating the profile. Please try again.
            </p>
          )}
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button type="submit" className="btn px-3 py-2">
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
