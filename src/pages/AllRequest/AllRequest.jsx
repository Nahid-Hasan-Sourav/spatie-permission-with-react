import { useContext, useState } from "react";
import { UserContext } from "../../context/userProvider";

const AllRequest = () => {
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const { incomingRequest } = useContext(UserContext);
  const updateAprove=async(item)=>{
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const data={
        id:item.id
    }
    try {
        const response = await fetch(`${apiUrl}accept-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,

            },
            body: JSON.stringify(data),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            console.log('Response Data:', responseData.status);
            if(responseData.status==="aproved"){
             alert("OK!!!")
            //   setUpdateRolePermissionRefetch(!false)
            }
          
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }
  return (
    <div className="w-[100%]">
      <div className="p-[20px] md:w-[50%] w-[100%] md:mx-auto flex justify-between items-center bg-gray-200">
        <h1 className="text-2xl font-bold">All Users</h1>
        <button
          className="btn btn-neutral"
          onClick={() => addPaymentModalOpen(!setAddPaymentModalOpen)}
        >
          ADD NEW Payment
        </button>
      </div>

      <div className="flex justify-center md:w-[50%] w-[100%] md:mx-auto">
        <div className="overflow-x-auto w-[100%]">
          <table className="table w-full table-auto">
            {/* head */}
            <thead className="bg-[#64748b]">
              <tr className="text-white">
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Name</th>
               
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {incomingRequest?.data?.map((item, id) => {
                return (
                  <tr className="text-white bg-[#374151]" key={id}>
                    <td className="px-4 py-2 border">{id+1}</td>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">3 min ago</td>
                    <td className="flex px-4 py-2 border">
                      <button className="mr-3 btn btn-active btn-success"
                      onClick={()=>updateAprove(item)}
                      >
                        Approved
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
   
    </div>
  );
};

export default AllRequest;
