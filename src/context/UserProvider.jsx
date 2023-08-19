import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(); // Changed the context variable name

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState({}); // Changed variable name to allUsers

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  // Restore user data from local storage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array for initial mount

  // GET ALL USERS when component mounts
  useEffect(() => {
    axios.get(`${apiUrl}all-users`)
      .then(response => {
        setAllUsers(response.data);
       
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout,
    allUsers, // Include allUsers in the context value
    setAllUsers
  };
// console.log("Getting All Users",allUsers)
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>; // Changed context variable name
};

export default UserProvider;
