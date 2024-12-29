import { createContext, useState } from "react";

//creating a new context object for authentication
const AuthContext = createContext({});

//defining the AuthProvider component which will wrap its children with AuthContext.Provider
export const AuthProvider = ({ children }) => {
    //useState to create an auth state and a function to update it
    const [auth, setAuth] = useState({});

    const logout = () => {
        setAuth(null);
        //remove the token from localStorage or cookies
        localStorage.removeItem("authToken");
      };

    //return the AuthContext.Provider component with the auth state and setAuth function as its value
    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthContext };