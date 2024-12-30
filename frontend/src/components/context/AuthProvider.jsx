import { createContext, useState, useEffect } from "react";

//creating a new context object for authentication
const AuthContext = createContext({});

//defining the AuthProvider component which will wrap its children with AuthContext.Provider
export const AuthProvider = ({ children }) => {
    //useState to create an auth state and a function to update it
    const [auth, setAuth] = useState({});

       //useEffect to check for an existing token in localStorage when the component mounts
       useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setAuth({ token });
        }
    }, []);

    const logout = async () => {
        alert('do you want to log out?')
        try {
          const token = localStorage.getItem("authToken");
          await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          localStorage.removeItem("authToken");
          setAuth(null);
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

    
    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthContext };