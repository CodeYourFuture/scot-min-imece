export const loginUser = (email, password) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "content-type": "application/json"
    }
  };
  return fetch("/auth/login", options).then(res => {
    if (res.status >= 500) {
      throw new Error(res.statusText);
    }
    if (res.status === 403) {
      return {};
    }
    return res.json();
  });
};
