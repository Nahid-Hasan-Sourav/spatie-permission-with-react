import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(); // Changed the context variable name

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState({}); // Changed variable name to allUsers
  const [allRoles, setAllRoles] = useState([]);
  const [allPermission, setAllPermission] = useState([]);
  const [allRolePermission, setAllRolePermission] = useState([]);
  const [userRefetch,setUserRefetch]=useState(false);
  const [rolePermissionRefetch,setRolePermissionRefetch]=useState(false);
  const [updateRolePermissionRefetch,setUpdateRolePermissionRefetch]=useState(false);
  const [loading,setLoading]=useState(false);
  const [refetchPayment,setRefetchPayment]=useState(false);
  const [payment,setPayment]=useState(false);
  const [incomingRequest,setIncomingRequest]=useState([]);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  // Restore user data from local storage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
     if(storedUser.id){
      setLoading(!loading)
     }
      
    }
  },[user?.id]); // Empty dependency array for initial mount
  console.log("Loading Change first  : ",loading)
  console.log("Loading Change second : ",loading)

  // GET ALL USERS when component mounts
  useEffect(() => {
    axios.get(`${apiUrl}all-users`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        setAllUsers(response.data);
       
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userRefetch]);

  // GET ALL ROLES when component mounts
  useEffect(() => {
    axios.get(`${apiUrl}all-roles`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        setAllRoles(response.data);
       
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // GET ALL PERMISSION when component mounts
  useEffect(() => {
    axios.get(`${apiUrl}all-permission`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        setAllPermission(response.data);
       console.log('All Permission',response?.data?.permission[0])
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    // GET ALL Role With PERMISSION when component mounts
    useEffect(() => {
      axios.get(`${apiUrl}all-role-with-permission`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          setAllRolePermission(response.data);
        //  console.log('All Permission',response?.data?.permission[0])
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [updateRolePermissionRefetch]);

    //GET ALL PAYMENT
    useEffect(() => {
      axios.get(`${apiUrl}view-payment`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          setPayment(response.data);
        //  console.log('All Permission',response?.data?.permission[0])
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [refetchPayment]);

     //GET ALL INCOMIING REQUEST
     useEffect(() => {
      axios.get(`${apiUrl}incoming-request`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          setIncomingRequest(response.data);
        //  console.log('All Permission',response?.data?.permission[0])
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [refetchPayment]);

  const logout = () => {
    localStorage.removeItem("user");
    setLoading(!true)
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout,
    allUsers, // Include allUsers in the context value
    setAllUsers,
    allRoles,
    userRefetch,
    setUserRefetch,
    setAllPermission,
    allPermission,
    allRolePermission,
    setAllRolePermission,
    rolePermissionRefetch,
    setRolePermissionRefetch,
    updateRolePermissionRefetch,
    setUpdateRolePermissionRefetch,
    payment,
    loading,
    setLoading,
    setRefetchPayment,
    incomingRequest

  };
// console.log("Getting All Users",allUsers)
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>; // Changed context variable name
};

export default UserProvider;
