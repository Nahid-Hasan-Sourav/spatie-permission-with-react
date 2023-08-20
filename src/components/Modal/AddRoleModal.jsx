import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";

const AddRoleModal = ({ openAddRole, closeAddRoleModal,setOpenAddRole,}) => {
    const {allPermission, setRolePermissionRefetch,rolePermissionRefetch}=useContext(UserContext)
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleCheckboxChange = (permissionId) => {
      if (selectedPermissions.includes(permissionId)) {
        setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
      } else {
        setSelectedPermissions([...selectedPermissions, permissionId]);
      }
    };
  const handleAddRole = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name= form.name.value;
    const roleInfo = {
        name,
        permission:selectedPermissions
    }
    console.log("Permission ",roleInfo)
    try {
        const response = await fetch(`${apiUrl}add-role-permission`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roleInfo),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            console.log('Response Data:', responseData.status);
            if(responseData.status==="success"){
            form.reset();
            setOpenAddRole(!openAddRole);
            setRolePermissionRefetch(!rolePermissionRefetch);
            }
          
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };
  return (
    <>
      {openAddRole && (
        <div
          id="my_modal_3"
          className="fixed top-[10%] left-[40%] visible w-screen h-screen bg-[#ffffff20] opacity-100 z-10"
        >
          <form
            className="shadow-xl modal-box card bg-base-100"
            onSubmit={handleAddRole}
          >
            <button
              type="button"
              onClick={closeAddRoleModal}
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
                />
              </div>
              <div className="flex flex-col mb-4">
                {
                    allPermission?.permission?.map((item,id)=>{
                        return(
                            <div className="flex " key={id}>
                            <input
                              type="checkbox"
                              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              id={`permission-checkbox-${id}`}
                              onChange={() => handleCheckboxChange(item.id)}
                              checked={selectedPermissions.includes(item.id)}
                              name="permission" 
                            />
                            <label className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                              {item.name}
                            </label>
                          </div>
                        )
                    })
                }
               
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

export default AddRoleModal;
