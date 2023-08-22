import { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddPaymentModal from "../../components/Modal/AddPaymentModal";
import { UserContext } from "../../context/userProvider";
import EditPaymentModal from "../../components/Modal/EditPaymentModal";

const AllPayment = () => {
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const { payment, buttonLoading,setButtonLoading} = useContext(UserContext);
  const [editPaymentModalData, setEditPaymentModalData] = useState({});
  const [editPaymentModal, setEditPaymentModal] = useState(false);
  // console.log("PAYMENT",payment);
  const handleEditModal = (item) => {
    setEditPaymentModal(!editPaymentModal);
    setEditPaymentModalData(item);
  };

  return (
    <div className="w-[100%]">
      <div className="p-[20px] md:w-[50%] w-[100%] md:mx-auto flex justify-between items-center bg-gray-200">
        <h1 className="text-2xl font-bold">All Users</h1>
        <button
          className="btn btn-neutral"
          onClick={() => setAddPaymentModalOpen(!addPaymentModalOpen)}
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
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {payment?.payment?.map((item, id) => {
                return (
                  <tr className="text-white bg-[#374151]" key={id}>
                    <td className="px-4 py-2 border">{id + 1}</td>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{item.amount}</td>
                    <td className="px-4 py-2 border">3 min ago</td>
                    <td className="flex px-4 py-2 border">
                    
                      <button
                        className="mr-3 btn btn-active btn-success"
                        onClick={() => handleEditModal(item)}
                      >
                      <FaEdit className="text-2xl" />
                      </button>

                      <button className="btn btn-active btn-error">
                        <MdDelete className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AddPaymentModal
        addPaymentModalOpen={addPaymentModalOpen}
        setAddPaymentModalOpen={setAddPaymentModalOpen}
      />
      <EditPaymentModal
        editPaymentModalData={editPaymentModalData}
        setEditPaymentModalData={setEditPaymentModalData}
        editPaymentModal={editPaymentModal}
        setEditPaymentModal={setEditPaymentModal}
      />
    </div>
  );
};

export default AllPayment;
