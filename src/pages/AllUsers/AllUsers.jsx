import { useContext, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import AddUserModal from '../../components/Modal/AddUserModal';
import { UserContext } from '../../context/UserProvider';
import TimeAgo from '../../components/Times/TimeAgo';
const AllUsers = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const {allUsers}=useContext(UserContext)
  console.log("Getting all users",allUsers.allusers)
  const [isOpen,setisOpen]=useState(false);
  const onClose=()=>{
    setisOpen(!true);
  }

  

  return (
    <div className="w-[100%]">
   <div className="p-[20px] md:w-[50%] w-[100%] md:mx-auto flex justify-between items-center bg-gray-200"> 
     <h1 className="text-2xl font-bold">
        All Users
     </h1>
     <button className="btn btn-neutral" onClick={()=>setisOpen(!false)} >ADD USER</button>

  </div>
  
  <div className="flex justify-center md:w-[50%] w-[100%] md:mx-auto">       
       <div className="overflow-x-auto w-[100%]">
       <table className="table w-full table-auto">
         {/* head */}
         <thead className="bg-[#64748b]">
         <tr className="text-white"> 
             <th className="px-4 py-2"></th>
             <th className="px-4 py-2">Name</th>
             <th className="px-4 py-2">Role</th>
             <th className="px-4 py-2">Created At</th>
             <th className="px-4 py-2">Action</th>
           </tr>

         </thead>
         <tbody>

         {
            allUsers?.allusers?.map((item,id)=>{
           return(
         
            <tr className="text-white bg-[#374151]" key={id}>
              {   console.log("Users",item?.roles[0]?.name)}
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">{item?.name}</td>
            <td className="px-4 py-2 border">{item?.roles[0]?.name ? item?.roles[0]?.name :"NOT SET YET"}</td>
            <td className="px-4 py-2 border"><TimeAgo createdAt={item.created_at}></TimeAgo></td>
            <td className="px-4 py-2 border flex">
             <button className="btn btn-active btn-success mr-3">
             <FaEdit className='text-2xl'/>
             </button>
             <button className="btn btn-active btn-error">
             <MdDelete className='text-2xl'/>
             </button>
            </td>
          </tr>
           )
           
            })
           }
          
         </tbody>
       </table>
     </div>
   </div>
  <AddUserModal isOpen={isOpen} onClose={onClose}/>
  </div>
  );
};

export default AllUsers;
