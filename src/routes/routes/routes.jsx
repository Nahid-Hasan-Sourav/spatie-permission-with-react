import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Main from "../../Layouts/Main";
import Dashboard from "../../Layouts/Dashboard";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import AllRoles from "../../pages/AllRoles/AllRoles";
import AllUsers from "../../pages/AllUsers/AllUsers";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>,
                
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signUp',
                element:<SignUp/>
            },
            {
                path:'/dashboard',
                element:<PrivateRoute><Dashboard/></PrivateRoute>,
                children:[
                    {
                        path:'all-roles',
                        element:<PrivateRoute><AllRoles/></PrivateRoute>
                    },
                    {
                        path:'all-users',
                        element:<PrivateRoute><AllUsers/></PrivateRoute>
                    }
                ]
                
            },
            
          
        ]
    }
])