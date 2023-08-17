const AllUsers = () => {
  return (
    <div className="w-[100%]">
   <div className="p-[20px] md:w-2/5 w-[100%] md:mx-auto flex justify-between items-center bg-gray-200"> 
     <h1 className="text-2xl font-bold">
        All Users
     </h1>
     <button className="btn btn-neutral">Neutral</button>

  </div>
  
  <div className="flex justify-center md:w-2/5 w-[100%] md:mx-auto">       
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
           <tr className="text-white bg-[#374151]">
             <td className="px-4 py-2 border">1</td>
             <td className="px-4 py-2 border">Cy Ganderton</td>
             <td className="px-4 py-2 border">Quality Control Specialist</td>
             <td className="px-4 py-2 border">Blue</td>
             <td className="px-4 py-2 border">Blue</td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
  
  </div>
  );
};

export default AllUsers;
