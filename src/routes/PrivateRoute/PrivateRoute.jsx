import { useContext } from "react";
import { UserContext } from "../../context/userProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(UserContext)
    const location=useLocation();
    
    if(loading){
        <div>Loading....</div>
    }
    if(user && user.id){
        return children;
    }

    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;