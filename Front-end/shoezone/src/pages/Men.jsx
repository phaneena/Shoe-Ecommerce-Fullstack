import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
function Men(){
    const[men,setMen]=useState([])
    const {handleAddToCart}=useContext(shoecontext)
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
                const response=await axios.get("http://localhost:5000/Products")
                const Mendata=response.data
                console.log("all data",Mendata);
                
                setMen(Mendata.filter((items)=>items.categories==='men'))
                console.log('Mendata',men);
                
            }
            catch(error){
                console.log(error.message)
            }
        }
        fetchProducts()
    },[])

    return(
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {men.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    {/* <div className="w-36 h-36 overflow-hidden mb-2"> Set to smaller size */}
                        <img
                            src={product.images}
                            alt={product.name}
                            className="w-full h-60 rounded-t object-cover" // Full width and height of the container
                        />
                    <h1 className="mt-2 text-lg font-semibold text-center">{product.name}</h1>
                    <p className="mt-1 text-gray-700 text-center"> ₹ {product.price}</p>
                    <button
                        className="w-full mt-3 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                        onClick={() =>{
                            if(localStorage.getItem('id')){
                                handleAddToCart(product)
                                // toast.success('Item added successfully')
                            }
                            else{
                                navigate('/login')
                            }
                        }} // Call the add to cart function
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
            <ToastContainer />
        </div>
    )
}
export default Men