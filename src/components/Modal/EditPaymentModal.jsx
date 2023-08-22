import { useContext } from "react";
import { UserContext } from "../../context/userProvider";

const EditPaymentModal = ({editPaymentModal,setEditPaymentModal,editPaymentModalData,setEditPaymentModalData}) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const {buttonLoading,setButtonLoading}=useContext(UserContext);
  //  console.log("This is the edit modal payment ",editPaymentModalData)

   const handleNameChange = (e) => {
    const updatedData = { ...editPaymentModalData, name: e.target.value };
    setEditPaymentModalData(updatedData);
  };
   const handleaAmountChange = (e) => {
    const updatedData = { ...editPaymentModalData, amount: e.target.value };
    setEditPaymentModalData(updatedData);
  };


    const updatePaymentInfo= async (e)=>{
        e.preventDefault();
        const form=e.target;
        // const name=form.paymentName.value;
        // const amount=form.amount.value;

        const updatePayment={
            id:editPaymentModalData.id,
            name:editPaymentModalData.name,
            amount:editPaymentModalData.amount
        }
        console.log("Update Payment",updatePayment)
        try {
            const response = await fetch(`${apiUrl}request-update-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    
                },
                body: JSON.stringify(updatePayment),
            });
        
            if (response.ok) {
                const responseData = await response.json();
                console.log('Response Data:', responseData);
                if(responseData.status==="pending"){
                  form.reset();
                  // setEditPaymentModal("pending");
                  // setButtonLoading(!buttonLoading);
                  setEditPaymentModal(!editPaymentModal);
                //   setUpdateRolePermissionRefetch(!false)
                }
              
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // finally {
        //   setButtonLoading(false); // Reset loading state after fetch completion
        // }
    }
    return (
        <>
      {editPaymentModal && (
        <div
          id="my_modal_3"
          className="fixed top-[10%] left-[40%] visible w-screen h-screen bg-[#ffffff20] opacity-100 z-10"
        >
          <form
            className="shadow-xl modal-box card bg-base-100"
            onSubmit={(e)=>updatePaymentInfo(e)}
          >
            <button
              type="button"
              onClick={()=>setEditPaymentModal(!editPaymentModal)}
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
                 
                  type="text"
                  name="paymentName"
                  onChange={handleNameChange} // Attach the onChange handler
                  value={editPaymentModalData.name}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Amount
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="amount"
                  type="text"
                  onChange={handleaAmountChange}
                  value={editPaymentModalData.amount}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Payment
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
    );
};

export default EditPaymentModal;