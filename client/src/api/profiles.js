export const getProfiles = () => {
  return fetch("/api/profiles").then(res => res.json());
};

export const getProfile = profileId => {
  return fetch(`/api/profiles/${profileId}`).then(res => res.json());
};
