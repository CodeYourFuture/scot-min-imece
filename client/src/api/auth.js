export const loginUser = (email, password) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "content-type": "application/json"
    }
  };
  return fetch("/auth/login", options)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
