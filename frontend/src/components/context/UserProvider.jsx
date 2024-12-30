import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//context for the user
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  //to store user data
  const [user, setUser] = useState(null);
  //manage loading status
  const [loading, setLoading] = useState(true);

  //etch user data from the server
  const fetchUser = async () => {
    try {
      //get authentication token from local storage
      const token = localStorage.getItem('authToken');
      //GET request to fetch user profile
      const response = await axios.get('http://localhost:3000/users/profile', {
        headers: {
          Authorization: `Bearer ${token}` //set authorization header with the token
        }
      });
      //update the user state with the fetched data
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  //fetch user data when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  
  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;