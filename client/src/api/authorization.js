// A wrapper for the fetch API which adds the Authorization
// header to the request with the token returned by the login.
const fetchWithAuthorization = (url, options) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Trying to invoke API with no token");
    return fetch(url, options);
  }

  var headers;

  if (options) {
    headers = options.headers;
  }

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  });
};

export default fetchWithAuthorization;
