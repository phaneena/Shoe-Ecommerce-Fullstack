import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
// import { Toaster } from "react-hot-toast";
import {
  getUserOrder,
  getAllUsers,
  blockUser,
} from "../../features/adminSlice";

function AdminUser() {
  const {
    user,
    loading: userLoading,
    error: userEroor,
    totalPages,
    currentPage,
    userOrder,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState(false);
  const [page, setPage] = useState(1);
  console.log(userOrder, "order");
  useEffect(() => {
    dispatch(getAllUsers({ page }));
  }, [dispatch, page]);

  const handleBlockUser = (id) => {
    if (
      window.confirm(
        "Are you sure you want to change this user's block status?"
      )
    ) {
      dispatch(blockUser(id))
        .unwrap()
        .then((response) => {
          dispatch(getAllUsers({}));
        });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDoubleClick = async (id) => {
    console.log(userOrder);
    const selectedUser = user.find((u) => u._id === id); // Find the selected user
    if (selectedUser) {
      setOrderList({
        name: selectedUser.name,
        email: selectedUser.email,
      }); // Set user details in orderList state
    }

    try {
      const response = await dispatch(getUserOrder(id)).unwrap();
      console.log("Fetched user order:", response);
    } catch (error) {
      console.error("Error fetching user order:", error);
    }
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center py-4">Loading...</div>
    );
  }

  if (userEroor) {
    return (
      <div className="text-red-500 text-center py-4">
        Error: {userEroor ? userEroor : orderError}
      </div>
    );
  }

  return (
    <div>
      {/* <Toaster /> */}
      <table className="bg-gray-100 w-full">
        <thead>
          <tr className="bg-primary/90 text-black">
            <th className="px-4 py-3 rounded-tl-xl">Name</th>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3 rounded-tr-xl">Status</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-500 hover:text-white"
              onClick={() => handleDoubleClick(user._id)}
            >
              <td className="px-2 py-2">{user.name}</td>
              <td className="px-2 py-2">{user.username}</td>
              <td className="px-2 py-2">{user.email}</td>
              <td className="px-2 py-2 hover:scale-105">
                <button
                  className={`py-1 px-3 rounded ${
                    user.isBlock ? "bg-red-800" : "bg-yellow-500"
                  }`}
                  onClick={() => handleBlockUser(user._id)}
                >
                  {user.isBlock ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            className={`px-4 py-2 rounded ${
              page === num + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {orderList && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 relative max-w-lg w-full h-3/4 overflow-y-auto shadow-lg">
            <MdClose
              className="absolute top-3 right-3 cursor-pointer text-2xl text-gray-700 hover:text-red-500"
              onClick={() => setOrderList(false)}
            />

            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">User Details</h2>
              <p className="text-gray-700">
                <strong>Name:</strong> {orderList.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {orderList.email}
              </p>
            </div>
            <div className="border-t border-gray-300 pt-4">
              {userOrder.length === 0 ? (
                <h3 className="text-lg font-semibold text-gray-600">
                  No Orders Placed
                </h3>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                  {userOrder.map((order,index) => (
                    <div key={order._id}>
                      <h3 className="text-xl font-semibold">
                        Order  {index+1}
                      </h3>
                      <h4 className="mt-2 font-semibold">Items:</h4>
                      <ul className="list-disc list-inside">
                        {order.items.map((item) => (
                          <li key={item.productId._id}>
                            {item.productId.name} <span> :-</span>{" "}
                            {item.productId.price} x {item.quantity} ={" "}
                            {item.productId.price * item.quantity}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 font-bold">Total: {order.total}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUser;
