import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userProvider";

const Login = () => {
  // const [name,setName]=useState('');
  // const [email,setEmail]=useState('');
  const { user, setUser } = useContext(userContext);
  const navigate=useNavigate();
  const handleUserLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const UserName = form.username.value;
    const password = form.password.value;
    const userInfo = {
      username: UserName,
      password,
    };

    try {
      const response = await fetch("http://192.168.0.4:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData);
        // Save user data and token to local storage
        localStorage.setItem("user", JSON.stringify(responseData.data)); // Save user data
        localStorage.setItem("token", responseData.token); // Save token
        navigate("/dashboard")
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-400">
      <div className="w-full max-w-md mx-auto bg-white rounded shadow-lg ">
        <form
          className="px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => handleUserLogin(e)}
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              User Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="******************"
            />
            {/* <p className="text-xs italic text-red-500">
              Please choose a password.
            </p> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/signUp"
                className="font-medium text-black text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
