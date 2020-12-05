import fetchWithAuthorization from "./authorization";

export const getProfiles = () => {
  return fetchWithAuthorization("/api/profiles").then(res => res.json());
};

export const getProfile = profileId => {
  return fetchWithAuthorization(`/api/profiles/${profileId}`).then(res =>
    res.json()
  );
};

export const postProfile = profile => {
  const sendProfile = {
    method: "POST",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json"
    }
  };

  return fetch("/api/profiles", sendProfile).then(res => res.ok);
};

export const deleteProfile = profileId => {
  fetchWithAuthorization(`/api/profiles/${profileId}`, {
    method: "DELETE"
  }).then(res => res.ok);
};

export const getNationalities = () => {
  return fetchWithAuthorization("/api/profiles/nationalities").then(res =>
    res.json()
  );
};

export const getGroups = () => {
  return fetchWithAuthorization("/api/profiles/groups").then(res => res.json());
};
