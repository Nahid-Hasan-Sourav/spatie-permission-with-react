import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";

const EditRoleModel = ({editRoleModal,setEditRoleModal,editRoleModalData,closeEditRoleModal}) => {
  
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { allPermission,updateRolePermissionRefetch,setUpdateRolePermissionRefetch } = useContext(UserContext);

    const [checkedPermissions, setCheckedPermissions] = useState([]);

    useEffect(() => {
        setCheckedPermissions(
          editRoleModalData?.permissions?.map((perm) => perm.id) || []
        );
      }, [editRoleModalData]);
    
      const handlePermissionToggle = (permissionId) => {
        if (checkedPermissions.includes(permissionId)) {
          setCheckedPermissions((prevPermissions) =>
            prevPermissions.filter((id) => id !== permissionId)
          );
        } else {
          setCheckedPermissions((prevPermissions) => [
            ...prevPermissions,
            permissionId,
          ]);
        }
      };
      console.log("All Permissiowwwwwd",editRoleModalData.id)

  const handleUpdateRole = async (e) => {
    e.preventDefault()
    const form=e.target;
    const name= form.name.value;
    const updateRolePermission={
        id:editRoleModalData.id,
        name,
        permissions:checkedPermissions
    }
    console.log("Working", updateRolePermission);
    
    try {
        const response = await fetch(`${apiUrl}update-role-permission`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,

            },
            body: JSON.stringify(updateRolePermission),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            console.log('Response Data:', responseData.status);
            if(responseData.status==="success"){
              form.reset();
              setEditRoleModal(!editRoleModal);
              setUpdateRolePermissionRefetch(!false)
            }
          
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };
 
  return (
    <div>
      <>
        {editRoleModal && (
          <div
            id="my_modal_3"
            className="fixed top-[10%] left-[40%] visible w-screen h-screen bg-[#ffffff20] opacity-100 z-10"
          >
            <form
              className="shadow-xl modal-box card bg-base-100"
              onSubmit={handleUpdateRole}
            >
              <button
                type="button"
                onClick={closeEditRoleModal}
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
                    value={editRoleModalData?.name}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  {allPermission?.permission?.map((item, id) => {
                    // const exitId = editRoleModalData?.permissions?.map((item)=>item.id);
                    // const isPermissionChecked=exitId.includes(item.id);
                    // const isPermissionChecked =
                    //   editRoleModalData?.permissions?.some(
                    //     (permission) => permission.id === item.id
                    //   );
                    const isPermissionChecked = checkedPermissions.includes(item.id);
                    console.log("Checked", isPermissionChecked);
                    return (
                      <div className="flex " key={id}>
                        <input
                          type="checkbox"
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id={`permission-checkbox-${id}`}
                          checked={isPermissionChecked}
                          onChange={() => handlePermissionToggle(item.id)}
                          
                        />
                        <label className="ml-3 text-sm text-gray-500 dark:text-gray-400"
                        htmlFor={`permission-checkbox-${id}`}
                        >
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
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
    </div>
  );
};

export default EditRoleModel;
