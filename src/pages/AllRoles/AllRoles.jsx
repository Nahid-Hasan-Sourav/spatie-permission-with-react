import { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddRoleModal from "../../components/Modal/AddRoleModal";
import { UserContext } from "../../context/UserProvider";
import EditRoleModel from "../../components/Modal/EditRoleModel";
const AllRoles = () => {
  const { allRolePermission } = useContext(UserContext);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [editRoleModal,setEditRoleModal]=useState(false);
  const [editRoleModalData,setEditRoleModalData]=useState({});
  console.log("All Data Permission", allRolePermission);
  
  const closeAddRoleModal = () => {
    setOpenAddRole(!openAddRole);
  };
  const closeEditRoleModal = () => {
    setEditRoleModal(!editRoleModal);
  };
  const editRoleModals=(data)=>{
    setEditRoleModal(!editRoleModal)
    setEditRoleModalData(data)
  }
  return (
    <div className="w-[100%]">
      <div className="p-[20px] md:w-[50%] w-[100%] md:mx-auto flex justify-between items-center bg-gray-200">
        <h1 className="text-2xl font-bold">All Users</h1>
        <button
          className="btn btn-neutral"
          onClick={() => setOpenAddRole(!openAddRole)}
        >
          ADD NEW ROLE
        </button>
      </div>

      <div className="flex justify-center md:w-[50%] w-[100%] md:mx-auto">
        <div className="overflow-x-auto w-[100%]">
          <table className="table w-full table-auto">
            {/* head */}
            <thead className="bg-[#64748b]">
              <tr className="text-white">
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Permission</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allRolePermission?.allData?.map((item, id) => (
                <tr className="text-white bg-[#374151]" key={id}>
                  <td className="px-4 py-2 border">{id + 1}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">
                    {item?.permissions?.map((perm, permId) => (
                      <span key={permId}>{perm.name} , </span>
                    )) }
                     {console.log("Permissions Array:", item?.permission)}
                  </td>
                  <td className="px-4 py-2 border">3 min ago</td>
                  <td className="flex px-4 py-2 border">
                    <button className="mr-3 btn btn-active btn-success"
                    onClick={()=>editRoleModals(item)}
                    >
                      <FaEdit className="text-2xl" />
                    </button>
                    <button className="btn btn-active btn-error">
                      <MdDelete className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <AddUserModal 
       isOpen={isOpen} 
       onClose={onClose}
       setisOpen={setisOpen}
     
       
       />
       <EditUserModal 
       isEditModalOpen={isEditModalOpen} 
       setIsEditModalOpen={setIsEditModalOpen}
       closeEditModal={closeEditModal}
       editData={editData}
     
       /> */}
      <AddRoleModal
        openAddRole={openAddRole}
        setOpenAddRole={setOpenAddRole}
        closeAddRoleModal={closeAddRoleModal}
      />
      <EditRoleModel
      editRoleModal={editRoleModal}
      setEditRoleModal={setEditRoleModal}
      editRoleModalData={editRoleModalData}
      closeEditRoleModal={closeEditRoleModal}
      />
    </div>
  );
};

export default AllRoles;
