import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //i will save user data from local storage i i refresh browser it will not remove user state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserProvider;
