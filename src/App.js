import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loading">Loading GitHub Users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1 className="page-title">GitHub Users</h1>
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-card-inner">
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                className="user-avatar" 
              />
              <div className="user-info">
                <h2 className="username">{user.login}</h2>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="profile-link"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;