import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Main from "../../Layouts/Main";
import Dashboard from "../../Layouts/Dashboard";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";

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
                path:'dashboard',
                element:<Dashboard/>,
                
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signUp',
                element:<SignUp/>
            }
        ]
    }
])