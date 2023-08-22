import { useContext } from "react";
import { UserContext } from "../../context/userProvider";

const AddPaymentModal = ({addPaymentModalOpen,setAddPaymentModalOpen}) => {
    const {refetchPayment,setRefetchPayment}=useContext(UserContext);
    const addPayment= async (e)=>{
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

        const form = e.target;
        const name = form.name.value;
        const amount=Number(form.amount.value);
        
        const paymentInfo={
            name,
            amount
        }

        try {
            const response = await fetch(`${apiUrl}add-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    
                },
                body: JSON.stringify(paymentInfo),
            });
        
            if (response.ok) {
                const responseData = await response.json();
                console.log('Response Data:', responseData.status);
                if(responseData.status==="success"){
                form.reset();
                setRefetchPayment(!refetchPayment)
                setAddPaymentModalOpen(!addPaymentModalOpen)
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
      {addPaymentModalOpen && (
        <div
          id="my_modal_3"
          className="fixed top-[10%] left-[40%] visible w-screen h-screen bg-[#ffffff20] opacity-100 z-10"
        >
          <form
            className="shadow-xl modal-box card bg-base-100"
            onSubmit={(e)=>addPayment(e)}
          >
            <button
              type="button"
              onClick={()=>setAddPaymentModalOpen(!true)}
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
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Amount
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="amount"
                  type="text"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Payment
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
    );
};

export default AddPaymentModal;