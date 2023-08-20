import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

const EditUserModal = ({isEditModalOpen,setIsEditModalOpen,closeEditModal,editData}) => {
  const {allRoles,setUserRefetch,userRefetch}=useContext(UserContext)
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleUserUpdate= async (e)=>{
    e.preventDefault()
    const form=e.target;
    const name= form.name.value;
    const username= form.username.value;
    const email= form.email.value;
    const role= form.role.value;

    
    const updateUserInfo={
      id:editData.id,
      name,
      email,
      username,
      role
    }
    console.log("Update data",updateUserInfo)
    try {
      const response = await fetch(`${apiUrl}update`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,

          },
          body: JSON.stringify(updateUserInfo),
      });
  
      if (response.ok) {
          const responseData = await response.json();
          console.log('Response Data:', responseData.status);
          if(responseData.status==="success"){
            form.reset();
            setIsEditModalOpen(!isEditModalOpen);
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
        {isEditModalOpen && (
          <div
            id="my_modal_3"
            className="fixed top-[10%] left-[40%] visible w-screen h-screen bg-[#ffffff20] opacity-100 z-10"
          >
            <form className="shadow-xl modal-box card bg-base-100"
            onSubmit={handleUserUpdate}
            >
              <button
                type="button"
                onClick={closeEditModal}
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
                    value={editData.name}
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
                    value={editData.email}
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
                    value={editData.username}
                  />
                </div>  
                <div className="mb-6">
                  <select className="w-full max-w-xs select select-bordered" name="role">
                    {
                      allRoles?.allrole?.map((item,id)=>{
                        return(
                          <option key={id} selected={item.id==editData?.roles[0]?.id} value={item.id}>
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
                   Update User
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </>
    );
};

export default EditUserModal;