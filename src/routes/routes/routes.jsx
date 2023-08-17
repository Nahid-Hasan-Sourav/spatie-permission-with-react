import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Main from "../../Layouts/Main";
import Dashboard from "../../Layouts/Dashboard";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import AllRoles from "../../pages/AllRoles/AllRoles";
import AllUsers from "../../pages/AllUsers/AllUsers";

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
                element:<Dashboard/>,
                children:[
                    {
                        path:'all-roles',
                        element:<AllRoles/>
                    },
                    {
                        path:'all-users',
                        element:<AllUsers/>
                    }
                ]
                
            },
            
          
        ]
    }
])