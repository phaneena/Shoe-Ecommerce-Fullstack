// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { showOrders } from '../features/orderSlice';

// const Order = () => {
//     // const [orders, setOrders] = useState([]);
//     const dispatch=useDispatch()
//     const {orders,loading,error}=useSelector(state=>state.order)

//     useEffect(()=>{
//         dispatch(showOrders())
//     },[dispatch])

//     if (loading) {
//         return (
//           <div className="flex justify-center py-4">
//             <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         );
//       }

//       if (error) {
//         return <div className="text-red-500 text-center py-4">Error: {error}</div>;
//       }

//     // useEffect(() => {
//     //     const fetchOrders = async () => {
//     //         const id = localStorage.getItem('id'); // Get user ID from local storage
//     //         try {
//     //             const response = await axios.get(`http://localhost:5000/users/${id}`);
//     //             const userOrders = response.data.order || []; // Fetch user orders
//     //             setOrders(userOrders); // Set orders state
//     //         } catch (error) {
//     //             console.log('Error fetching orders:', error.message);
//     //         }
//     //     };

//     //     fetchOrders(); // Call function to fetch orders
//     // }, []);

//     // Function to delete a specific order
//     // const handleDeleteOrder = async (orderId) => {
//     //     const id = localStorage.getItem('id'); // Get user ID from local storage
//     //     try {
//     //         await axios.delete(`http://localhost:5000/users/${id}/orders/${orderId}`); // Adjust this URL to match your API
//     //         // Update local state to remove the deleted order
//     //         setOrders(orders.filter(order => order.id !== orderId));
//     //     } catch (error) {
//     //         console.log('Error deleting order:', error.message);
//     //     }
//     // };

//     // Function to clear all orders
//     // const handleClearAllOrders = async (product) => {
//     //     const id=localStorage.getItem("id")
//     //     console.log(product)
//     //     const deletedOrder=orders.filter((item)=>item.id!==product.id)
//     //     axios.patch(`http://localhost:5000/users/${id}`,{
//     //         order:deletedOrder
//     //     })
//     //     .then(()=>{
//     //         setOrders(deletedOrder)
//     //     })
//     // };

//     return (
//         <div className="max-w-4xl mx-auto px-4 py-6">
//             <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
//             {orders.length === 0 ? (
//     <p className="text-center text-lg">No orders found.</p>
// ) : (
//     orders.map((order, index) => (
//         <div key={index} className="mb-4 border p-4 rounded-md shadow-md">
//             <p className="text-lg font-semibold mb-2">Order {index + 1}</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//                 {order.items.map((product) => (
//                     <div key={product.id} className="flex items-center border-b py-2">
//                         <img
//                             src={product.images}
//                             className="w-24 h-24 object-cover rounded-md"
//                             alt={product.name}
//                         />
//                         <div className="ml-4">
//                             <p className="font-semibold">{product.name}</p>
//                             <p className="text-gray-600">₹ {product.price}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     ))
// )}

//              {/* {orders.length > 0 && (
//                 <button
//                     className="bg-black text-white px-6 py-2 rounded-2xl w-1/2 mt-4 hover:bg-red-600 text-sm"
//                     onClick={handleClearAllOrders}
//                 >
//                     CLEAR ALL ORDERS
//                 </button>
//             )} */}
//         </div>
//     );
// };

// export default Order;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showOrders } from "../features/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(showOrders()); // Dispatch the action to fetch orders
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-2">Order {index + 1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {order.items.map((product) => (
                <div
                  key={product.productId._id}
                  className="flex items-center border-b py-2"
                >
                  <img
                    src={product.productId.images}
                    className="w-24 h-24 object-cover rounded-md"
                    alt={product.productId.name}
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{product.productId.name}</p>
                    <p className="text-gray-600">₹ {product.productId.price}</p>
                    <p className="text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
