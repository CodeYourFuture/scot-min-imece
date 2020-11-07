export const getProfiles = () => {
  return fetch("/api/profiles").then(res => res.json());
};
