import React, { useState, useEffect } from "react";
import { getProfile, deleteProfile, getLanguages } from "../api/profiles";
import { useParams, useHistory } from "react-router-dom";

const ViewProfile = props => {
  const [profile, setProfile] = useState([]);
  const [delProfile, setDelProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const nationalities = props.allNationalities;
  const [languages, setLanguage] = useState([]);
  let { profileId } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (delProfile === false) {
      getProfile(profileId).then(response => {
        setProfile(response);
        document.title = `${response.first_name} ${response.last_name}  Profile`;
      });
      getLanguages().then(responce => {
        setLanguage(responce);
      })
    } else {
      deleteProfile(profileId);
      history.goBack();
    }
    return function cleanup() {
      document.title = "MIN - Imece";
    };
  }, [profileId, delProfile, history]);

  const confirmDelete = deleteConfirmed => {
    setDelProfile(deleteConfirmed);
    setShowDeleteModal(false);
  };

  let nationalityName = "";
  if (profile.nationality_id) {
    const nationality = nationalities.find(
      n => n.id === profile.nationality_id
    );
    if (nationality) {
      nationalityName = nationality.nationality;
    }
  };

  let languageName = "";
  if (profile.language_id) {
    const language = languages.find(
      l => l.id === profile.language_id
    );
    if (language) {
      languageName = language.language;
    }
  };

  return (
    <>
      <div className="flex flex-col max-w-5xl mx-auto">
        <div className="flex justify-between">
          <div>
            <a
              className="group flex items-center text-xl font-semibold cursor-pointer"
              onClick={() => history.goBack()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-300 mr-3 h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Go back
            </a>
          </div>
          <div>
            <button
              className="btn px-6 py-3"
              type="button"
              onClick={() => history.push(`/profiles/${profileId}/edit`)}
            >
              Edit
            </button>

            <button
              className="btn px-4 py-3 ml-4"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-left items-center mt-10 space-x-5">
            <h1 className="text-2xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h1>
            <div className="text-lg">{profile.status}</div>
            <div>{profile.type === "volunteer" ? "Volunteer" : ""}</div>
          </div>
          <div className="flex flex-col justify-between md:flex-row mt-10">
            <div className="flex-1 mb-5">
              <h2 className="text-lg font-bold mb-3">Personal Details</h2>
              <div className="flex flex-col space-y-2 text-gray-900 text-xl">
                <div>
                  <Label>Age:</Label>{" "}
                  {profile.age ? profile.age.years : "unknown"}
                </div>
                <div>
                  <Label>Nationality:</Label>
                  {nationalityName}
                </div>
                <div>
                  <Label>Gender:</Label> {profile.gender}
                </div>
                <div>
                  <Label>Languages:</Label> {languageName}
                </div>
                <div>
                  <Label>Other languages:</Label> {" "}
                  {profile.languages && profile.languages.join(", ")}
                </div>
                <div>
                  <Label>Immigration Status:</Label> {profile.asylum_status}
                </div>
              </div>
            </div>
            <div className="flex-1 mb-8">
              <h2 className="text-lg font-bold">Contact Details</h2>
              <div className="flex flex-col space-y-2 text-gray-900 text-xl">
                <div>
                  <Label>Email:</Label> {profile.email}
                </div>
                <div>
                  <Label>Phone:</Label> {profile.phone_number}
                </div>
                <div>
                  <Label>Address: </Label> {profile.address}
                </div>
              </div>
            </div>
            <div className="flex-1 mb-8">
              <h2 className="text-lg font-bold">MIN Details</h2>
              <div className="flex flex-col space-y-2 text-gray-900 text-xl">
                <div>
                  <Label>Groups:</Label>{" "}
                  {profile.groups && profile.groups.join(", ")}
                </div>
                <div>
                  <Label>How did they hear about us:</Label>
                  <p>{profile.how_did_they_hear}</p>
                </div>
                <div>
                  <Label>Joined:</Label>{" "}
                  {new Date(profile.join_date).toString().substring(4, 15)}
                </div>
                <div>
                  <Label>Notes:</Label>
                  <p>{profile.notes}</p>
                </div>
              </div>
            </div>
          </div>
          {showDeleteModal ? (
            <Modal
              heading="Delete this profile"
              content="Are you sure you want to delete this profile? Once deleted, it cannot be recovered."
              action={confirmDelete}
              yes="Delete"
              no="Cancel"
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

const Label = ({ children }) => (
  <span className="text-base text-gray-500 font-semibold mr-2">{children}</span>
);

const Modal = props => (
  <div
    className="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      ></div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>

      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              {props.heading}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{props.content}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={() => props.action(true)}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {props.yes}
          </button>
          <button
            type="button"
            onClick={() => props.action(false)}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            {props.no}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ViewProfile;
