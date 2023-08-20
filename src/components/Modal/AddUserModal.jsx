import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

const AddUserModal = ({ isOpen,setisOpen,onClose }) => {

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const {allRoles,setUserRefetch,userRefetch}=useContext(UserContext)

  console.log("This from add category pages :", isOpen);
  const handleAddNewUser= async (e)=>{
    e.preventDefault()
    const form=e.target;
    const name= form.name.value;
    const username= form.username.value;
    const email= form.email.value;
    const password= form.password.value;
    const role= form.role.value;
    const addUserInfo={
      name,
      email,
      password,
      username,
      role
    }
    console.log("Update data",addUserInfo)
    try {
      const response = await fetch(`${apiUrl}register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,

          },
          body: JSON.stringify(addUserInfo),
      });
  
      if (response.ok) {
          const responseData = await response.json();
          console.log('Response Data:', responseData.status);
          if(responseData.status==="success"){
            form.reset();
            setisOpen(!isOpen);
           setUserRefetch(!userRefetch);
          }
        
      } else {
          console.error('Error:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
  
  }
  return (
    <>
      {isOpen && (
        <div
          id="my_modal_3"
          className="fixed top-[10%] left-[40%] visible w-screen h-screen bg-[#ffffff20] opacity-100 z-10"
        >
          <form className="shadow-xl modal-box card bg-base-100" onSubmit={handleAddNewUser}>
            <button
              type="button"
              onClick={onClose}
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </button>
            <hr className="mt-[15px] mb-[10px]"></hr>
            <div>
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
                  name="email"
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
                  placeholder="U s e r n a m e"
                />
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

              <div className="mb-6">
                  <select className="w-full max-w-xs select select-bordered" name="role">
                    {
                      allRoles?.allrole?.map((item,id)=>{
                        return(
                          <option key={id} value={item.id}>
                         {item.name}
                        </option>
                        )
                      })
                    }
                   
                  </select>
                </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                 Add New User
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddUserModal;
