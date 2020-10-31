import React, { useState, useEffect } from "react";
import { getStatus, getUsers } from "../api/status";

const Status = () => {
  const [status, setStatus] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getStatus().then(response => {
      setStatus(response);
    });
    getUsers().then(response => {
      setUsers(response);
    });
  }, []);

  return (
    <div>
      <header className="app-header">
        <label>Database health check (querying users in DB):</label>
        {!users.length ? (
          <p>No users</p>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id}>user: {user.email}</li>
            ))}
          </ul>
        )}
        <h6>
          API health check:{" "}
          {!status ? "No Status received from server" : status}
        </h6>
      </header>
    </div>
  );
};

export default Status;
