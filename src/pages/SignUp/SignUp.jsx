import { Link, useNavigate  } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const UserName = form.username.value;
    const email = form.useremail.value;
    const password = form.password.value;
    const userInfo = {
      name,
      username:UserName,
      email,
      password
    }
    try {
      const response = await fetch('http://192.168.0.4:8080/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
      });
  
      if (response.ok) {
          const responseData = await response.json();
          console.log('Response Data:', responseData.status);
          if(responseData.status==="success"){
            navigate('/login');
          }
        
      } else {
          console.error('Error:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
   
    
  }
  
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-slate-400">
        <div className="w-full max-w-md mx-auto bg-white rounded shadow-lg ">
            <form onSubmit={handleSignIn}  className="px-8 pt-6 pb-8 mb-4 ">
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
             Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              placeholder="n a m e"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
             Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="useremail"
              type="email"
              placeholder="U s e r e m a i l"
            />
          </div>
          <div className="mb-4">
            
          <label className="block mb-2 text-sm font-bold text-gray-700">
             User Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="username"
              type="text"
              placeholder="U s e r n a m e"/>
            
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            
          </div>
          <div className="mt-4">
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account yet?{" "}
            <Link to="/login" className="font-medium text-black text-primary-600 hover:underline dark:text-primary-500">
           
              Login
        
            </Link>
            
          </p>
        </div>
        </form>
      
        </div>
        </div>
    );
};

export default SignUp;