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

  return fetchWithAuthorization("/api/profiles", sendProfile).then(
    res => res.ok
  );
};
