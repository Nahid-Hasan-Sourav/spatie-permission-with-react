import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
// import { userContext } from "../../context/UserProvider";

const Navbar = () => {
  // const { user,logout } = useContext(userContext);
  const {user,logout}=useContext(UserContext)
  console.log("this is from navbar user", user);
  return (
    <div>
      <div className="navbar bg-[#6082B6] lg:justify-around justify-between ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>

              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to="/">
            <p className="text-xl normal-case btn btn-ghost">PracticeProject</p>
          </Link>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">
          

            {user && user.id ? (
              <>
              
              <li className="text-white">
              <Link to="dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
               <li className="text-white">
                <Link to="" onClick={()=>logout()}>
                  <a>Logout</a>
                </Link>
              </li>

              
              </>
             
            ) : (
              <li className="text-white">
                <Link to="/login">
                  <a>Login</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
