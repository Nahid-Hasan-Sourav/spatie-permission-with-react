import { Link } from "react-router-dom";

const RightSideBar = () => {
  return (
    <>
      <div className="p-10 bg-gray-200 border border-red-600 ">
        <div className="text-center">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
            </div>
          </div>
          <div>
            <p>Nahid Hasan Sourav</p>
            <a href="">Edit Profile</a>
          </div>
        </div>
        <div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box w-52">
            <li>
              <Link to="all-roles"  className="text-black">
                Roles
              </Link>
            </li>
            <li>
              <Link to="all-users" className="text-black">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
