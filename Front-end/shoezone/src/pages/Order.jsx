// import React, { useContext } from "react";
// // import { shoecontext } from "../Context/ShopContext";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer,toast } from 'react-toastify';
// import { Form,ErrorMessage, Field, Formik } from "formik";
// import * as Yup from 'yup';
// import axios from "axios";

// function Order(){
//     const {cart
//     const navigate=useNavigate()
//     const initialValues={
//         name:'',
//         address:''
//     }
//     const validationSchema=Yup.object({
//         name:Yup.string()
//         .required('Name is required'),
//         address:Yup.string()
//         .required('Address is required')
//     })
   
//     // const handleOrder=async (order)=>{
//     //     const id=localStorage.getItem('id')
//     //     try{
//     //         const response=await axios.patch(`http://localhost:5000/users/${id}`,{
//     //             order:[order],
//     //             cart:[]
//     //         })
//     //         if(response.status===200){
//     //             toast.success('Order placed successfully');
//     //             navigate('/');
//     //         }
//     //         else{
//     //             toast.error('Failed to place order')
//     //         }
//     //     }
//     //     catch(error){
//     //         console.log(error.message)
//     //         toast('failed to place order')
//     //     }
//     // }
//     // const onSubmit = (values) => {
//     //     const id=localStorage.getItem('id')
//     //     console.log(values)
//     //     const order = {
//     //         ...values,
//     //         items: cart,
//     //         total: totalPrice,
//     //     };
//     //     console.log("order....",order);
        
//     //     const response=axios.get(`http://localhost:5000/users/${id}`)
//     //     const olddata=response.data.order
//     //     axios.patch(`http://localhost:5000/users/${id}`,{order:[...olddata,order]})
//     //     navigate('/')
//     // };

//     const onSubmit = async (values) => {
//         const id = localStorage.getItem('id');
//         const order = {
//             ...values,
//             items: cart,
//             total: totalPrice,
//         };
//         // console.log("Order Data:", order);
    
//         try {
//             const response = await axios.get(`http://localhost:5000/users/${id}`);
//             const oldOrders = response.data.order || []; // Use an empty array if undefined
    
//             // Update the orders in the database
//             await axios.patch(`http://localhost:5000/users/${id}`, {
//                 order: [...oldOrders, order], // Append new order to existing ones
//                 cart: [], // Clear the cart after placing the order
//             });
//             toast.success('Order placed successfully');
//             navigate('/');
//         } catch (error) {
//             console.error('Order submission failed:', error);
//             toast.error('Failed to place order');
//         }
//     };
    
//     return(
//         <div className="p-4 sm:p-8 md:w-3/4 lg:w-2/3 mx-auto">
//         <h1 className="text-center text-2xl font-semibold mb-6">ORDER PAGE</h1>
//         <br/>
//         <Formik 
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}>
//         <Form>
//             <div className="mb-4">
//                 <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
//                 <Field 
//                     type="text" 
//                     id="name" 
//                     name="name" 
//                     className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your name"
//                 />
//                 <ErrorMessage name="name" component='div' className="text-red-500 mt-1 text-sm"></ErrorMessage>
//             </div>

//             {/* Address Input */}
//             <div className="mb-4">
//                 <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Address</label>
//                 <Field
//                     as='textarea' 
//                     id="address" 
//                     name="address" 
//                     rows="4" 
//                     className="flex justify-center w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your address"
//                 />
//                 <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1"></ErrorMessage>
//             </div>
//             <div>
//                 <h1 className="text-lg font-semibold mt-6 mb-2">Order Summary</h1>
//                 {cart.map((product)=>(
//                     <div key={product.id} className="flex justify-between py-2 border-b text-sm md:text-base">
//                         <p>{product.name}</p>
//                         <p> ₹ {product.price}</p>
//                     </div>
//                 ))}
//                 <p className="text-right font-semibold mt-2">Total :  ₹ {totalPrice}</p>
//             </div>

//             <div className="flex justify-center mt-6">
//                 <button type='submit' className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit Order</button>
//             </div>
//             </Form>
//             </Formik>
//             <ToastContainer />

//         </div>
//     )
// }
// export default Order