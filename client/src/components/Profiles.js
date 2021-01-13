import React, { useState, useEffect } from "react";
import {
  Message,
  Search,
  Table,
  Button,
  Grid,
  Dropdown,
  Segment,
  Label,
  Divider,
  Header
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getProfiles, getNationalities, getGroups } from "../api/profiles";
import "../styles/dashboard.css";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectDropdown, setSelectDropdown] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroupsId, setSelectedGroupsId] = useState([]);
  let history = useHistory();

  const handleSearchChange = event => {
    setSearchInput(event.target.value);
  };
  const handleOnChange = (e, data) => {
    setSelectDropdown(data.value);
  };
  const handleOnGroupChange = (e, data) => {
    setSelectedGroupsId(data.value);
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
    key: national.id,
    text: national.nationality,
    value: national.id
  }));
  const group_options = groups.map(group => ({
    key: group.id,
    text: group.group_name,
    value: group.id
  }));

  const searchString = searchInput.toLowerCase();
  const isMatch = field => field.toLowerCase().includes(searchString);

  let filteredProfiles = profiles;
  if (selectDropdown.length > 0) {
    filteredProfiles = filteredProfiles.filter(profile =>
      selectDropdown.includes(profile.nationality_id)
    );
  }

  if (selectedGroupsId.length > 0) {
    let selectedGroups = groups.filter(group =>
      selectedGroupsId.includes(group.id)
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

  const getClassNamesFor = status => {
    let color;
    if (status === "new") {
      color = "new";
    } else if (status === "active") {
      color = "purples";
    } else color = "reds";
    return color;
  };

  const isVolunteer = profileType => {
    if (profileType === "volunteer") {
      return "Yes";
    }
    return "No";
  };

  const filteredGroupsNames = profileId => {
    let memberGroupsNames = [];
    let filteredGroups = groups.filter(group => group.members.length > 0);
    filteredGroups.map(group =>
      group.members.filter(member => {
        if (member === profileId) {
          memberGroupsNames.push(group.group_name);
        }
        return memberGroupsNames;
      })
    );
    return memberGroupsNames;
  };

  let date = new Date();
  const newProfile = profiles.filter(
    profile =>
      profile.join_date.split("-")[0].includes(date.getMonth()) &&
      profile.join_date.split("-")[0].includes(date.getFullYear())
  );
  const activeProfile = profiles.filter(profile => profile.status === "active");
  const inactiveProfile = profiles.filter(
    profile => profile.status === "inactive"
  );
  const volunteerProfile = profiles.filter(
    profile => profile.type === "volunteer"
  );

  return (
    <>
      <Segment className="dashboard-segment">
        <Grid className="dashboard-grid">
          <Grid.Row>
            <Grid.Column>
              <Button
                as={Link}
                to="/add-new-profile"
                icon="plus circle"
                labelPosition="right"
                size="medium"
                content="New Profile"
                className="new"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header as="h3" content="Service Users" />
            </Grid.Column>
            <Grid.Column>
              <Search
                onSearchChange={handleSearchChange}
                value={searchInput}
                showNoResults={false}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                style={{ backgroundColor: " #aad6e4" }}
                button
                labeled
                icon="world"
                className="icon"
                selection
                search
                multiple
                options={nationality_options}
                onChange={handleOnChange}
                placeholder="Nationality"
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                className="blues"
                button
                selection
                search
                multiple
                options={group_options}
                onChange={handleOnGroupChange}
                placeholder="Groups"
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                icon="setting"
                labelPosition="right"
                content="Settings"
                className="blues"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={1}> </Grid.Column>
            <Grid.Column width={14}>
              {filteredProfiles.length === 0 ? (
                <Message>No matching profiles found</Message>
              ) : (
                <Table sortable selectable celled collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Name</Table.HeaderCell>
                      <Table.HeaderCell>Phone</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Group</Table.HeaderCell>
                      <Table.HeaderCell>Volunteer</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredProfiles.map(profile => (
                      <Table.Row
                        onClick={() => history.push(`/profiles/${profile.id}`)}
                      >
                        <Table.Cell
                          children={`${profile.first_name}`}
                        ></Table.Cell>
                        <Table.Cell
                          children={`${profile.last_name}`}
                        ></Table.Cell>
                        <Table.Cell
                          children={profile.phone_number}
                        ></Table.Cell>
                        <Table.Cell children={profile.email}></Table.Cell>
                        <Table.Cell
                          children={filteredGroupsNames(profile.id).join(", ")}
                        ></Table.Cell>
                        <Table.Cell
                          children={isVolunteer(profile.type)}
                        ></Table.Cell>
                        <Table.Cell>
                          <Button
                            style={{ minWidth: "92px" }}
                            className={getClassNamesFor(profile.status)}
                          >
                            {profile.status}
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header as="h3" content="This month" />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                className="yellows"
                content="Collapse"
                icon="minus circle"
                labelPosition="right"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" textAlign="center" className="last-row">
            <Grid.Column>
              <Label>{newProfile.length}</Label>
              <br />
              <Header as="h4" content="Total of New People" />
              <Divider className="new" />
            </Grid.Column>
            <Grid.Column>
              <Label>{activeProfile.length}</Label>
              <br />
              <Header as="h4" content="Total of Active People" />
              <Divider className="purples" />
            </Grid.Column>
            <Grid.Column>
              <Label>{inactiveProfile.length}</Label>
              <br />
              <Header as="h4" content="Total of Inactive People" />
              <Divider className="reds" />
            </Grid.Column>
            <Grid.Column>
              <Label>{volunteerProfile.length}</Label>
              <br />
              <Header as="h4" content="Total of Volunteers" />
              <Divider className="blues" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default Profiles;
