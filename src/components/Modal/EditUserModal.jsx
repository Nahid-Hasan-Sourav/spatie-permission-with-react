
const EditUserModal = ({isEditModalOpen,closeEditModal,editData}) => {
    return (
        <>
        {isEditModalOpen && (
          <div
            id="my_modal_3"
            className="fixed top-[10%] left-[40%] visible w-screen h-screen bg-[#ffffff20] opacity-100 z-10"
          >
            <form className="modal-box card  bg-base-100 shadow-xl">
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
                    name="useremail"
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
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
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