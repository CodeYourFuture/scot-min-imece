import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getProfiles, getNationalities, getGroups } from "../api/profiles";
import "../styles/dashboard.css";
import Select from "react-select";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  let history = useHistory();

  const handleSearchChange = event => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    getProfiles().then(response => {
      setProfiles(response);
    });
    getNationalities().then(response => {
      setNationalities(response);
    });
    getGroups().then(response => {
      setGroups(response);
    });
  }, []);

  const nationality_options = nationalities.map(national => ({
    label: national.nationality,
    value: national.id
  }));
  const group_options = groups.map(group => ({
    key: group.id,
    label: group.group_name,
    value: group.id
  }));

  const searchString = searchInput.toLowerCase();
  const isMatch = field => field.toLowerCase().includes(searchString);

  let filteredProfiles = profiles;
  if (selectedNationalities.length > 0) {
    filteredProfiles = filteredProfiles.filter(profile =>
      selectedNationalities.includes(profile.nationality_id)
    );
  }

  if (selectedGroupIds.length > 0) {
    let selectedGroups = groups.filter(group =>
      selectedGroupIds.includes(group.id)
    );

    let groupMembers = [];
    selectedGroups.forEach(group => {
      groupMembers = groupMembers.concat(group.members);
    });
    filteredProfiles = filteredProfiles.filter(profile =>
      groupMembers.includes(profile.id)
    );
  }

  filteredProfiles = filteredProfiles.filter(
    profile =>
      isMatch(profile.first_name) ||
      isMatch(profile.last_name) ||
      isMatch(profile.email) ||
      (profile.address && isMatch(profile.address)) ||
      (profile.phone_number && isMatch(profile.phone_number)) ||
      (profile.occupation && isMatch(profile.occupation))
  );

  const getClassNames = status => {
    let color;
    if (status === "new") {
      color = "bg-yellow-300";
    } else if (status === "active") {
      color = "bg-pink-300";
    } else color = "bg-red-400 bg-opacity-80";
    return color;
  };

  const getProfilesGroups = profileId => {
    let profileGroupsNames = [];
    let filteredGroups = groups.filter(group => group.members.length > 0);
    filteredGroups.map(group =>
      group.members.filter(member => {
        if (member === profileId) {
          profileGroupsNames.push(group.group_name);
        }
        return profileGroupsNames;
      })
    );
    return profileGroupsNames;
  };

  let totalNewProfiles = 0;
  let totalActiveProfiles = 0;
  let totalInactiveProfiles = 0;
  let totalVolunteerProfiles = 0;

  profiles.forEach(profile => {
    if (profile.status === "new") totalNewProfiles++;
    if (profile.status === "active") totalActiveProfiles++;
    if (profile.status === "inactive") totalInactiveProfiles++;
    if (profile.type === "volunteer") totalVolunteerProfiles++;
  });

  return (
    <>
      <div className="flex flex-col w-full mx-10">
        <div className="flex justify-between mt-5">
          <NewProfileButton />
          <SettingsButton />
        </div>
        <div className="flex flex-col md:flex-row md:items-center mt-8">
          <h3 className="text-2xl text-gray-700 font-bold">Service Users</h3>
          <div class="flex-1 flex items-center justify-center px-2 ml-10 lg:mr-6 lg:justify-start">
            <Search onChange={handleSearchChange} value={searchInput} />
          </div>
          <Select
            className="flex-1"
            placeholder="Nationality"
            options={nationality_options}
            isMulti
            onChange={selected =>
              setSelectedNationalities(selected.map(s => s.value))
            }
          />
          <Select
            className="flex-1 md:ml-2"
            placeholder="Groups"
            options={group_options}
            isMulti
            onChange={selected =>
              setSelectedGroupIds(selected.map(s => s.value))
            }
          />
        </div>
        <div className="mt-8 shadow border-b border-gray-200 sm:rounded-lg">
          {filteredProfiles.length === 0 ? (
            <div className="text-gray-600 text-xl mt-6">
              No matching profiles found
            </div>
          ) : (
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-blue-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider whitespace-nowrap"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Groups
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Volunteer
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {filteredProfiles.map(profile => (
                  <tr onClick={() => history.push(`/profiles/${profile.id}`)}>
                    <td className="px-5 py-3">{`${profile.first_name}`}</td>
                    <td className="px-5 py-3">{`${profile.last_name}`}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      {profile.phone_number}
                    </td>
                    <td className="px-5 py-3">{profile.email}</td>
                    <td className="px-5 py-3">
                      {getProfilesGroups(profile.id).join(", ")}
                    </td>
                    <td className="px-5 py-3">
                      {profile.type === "volunteer" ? "Yes" : "No"}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        style={{ minWidth: "5rem" }}
                        className={`py-2 px-3 rounded-md font-medium ${getClassNames(
                          profile.status
                        )}`}
                      >
                        {profile.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="my-20">
          <h2 className="mb-5 text-xl font-semibold">This month</h2>
          <div className="flex space-x-20 justify-between text-center">
            <div className="flex-1 pb-4 border-b-4 border-yellow-200">
              <div className="text-2xl font-bold mb-4">{totalNewProfiles}</div>
              <h4 className="text-xl font-semibold text-gray-700">
                New People
              </h4>
            </div>
            <div className="flex-1 pb-4 border-b-4 border-pink-300">
              <div className="text-2xl font-bold mb-4">
                {totalActiveProfiles}
              </div>
              <h4 className="text-xl font-semibold text-gray-700">
                Active People
              </h4>
            </div>
            <div className="flex-1 pb-4 border-b-4 border-red-400">
              <div className="text-2xl font-bold mb-4">
                {totalInactiveProfiles}
              </div>
              <h4 className="text-xl font-semibold text-gray-700">
                Inactive People
              </h4>
            </div>
            <div className="flex-1 pb-4 border-b-4 border-blue-200">
              <div className="text-2xl font-bold mb-4">
                {totalVolunteerProfiles}
              </div>
              <h4 className="text-xl font-semibold text-gray-700">
                Volunteers
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Search = props => (
  <div class="max-w-lg w-full lg:max-w-xs">
    <label for="search" class="sr-only">
      Search
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        id="search"
        name="search"
        className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 "
        placeholder="Search"
        value={props.value}
        onChange={props.onChange}
        type="search"
      ></input>
    </div>
  </div>
);

const SettingsButton = () => (
  <Link
    to="#"
    className="bg-red-300 rounded-md text-gray-900 group py-3 px-4 flex items-center text-base font-medium"
  >
    <svg
      className="text-red-900 mr-4 h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
    Settings
  </Link>
);

const NewProfileButton = () => (
  <Link
    to="/add-new-profile"
    className="bg-blue-200 rounded-md text-gray-900 group py-3 px-4 flex items-center text-base font-medium"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-900 mr-4 h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clipRule="evenodd"
      />
    </svg>
    New Profile
  </Link>
);

export default Profiles;
