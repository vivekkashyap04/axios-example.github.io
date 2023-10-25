import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const result = response.data.results[0];
      setUser(result);
      localStorage.setItem('user', JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <h1>ReactJS Assignment</h1>
      {user && (
        <div>
          <h2>Name: {user.name.first} {user.name.last}</h2>
          <p>Email: {user.email}</p>
          <button onClick={fetchUser}>Refresh</button>
        </div>
      )}
    </div>
  );
};

export default App;

