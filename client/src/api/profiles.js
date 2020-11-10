export const postProfile = profile => {
  const sendProfile = {
    method: "POST",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json"
    }
  };

  return fetch("/api/profiles").then(res => res.ok);
};

export const getProfiles = () => {
  return fetch("/api/profiles").then(res => res.json());
};
