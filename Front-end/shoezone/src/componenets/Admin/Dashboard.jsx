import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../features/productSlice';
import { getAllUsers } from '../../features/adminSlice';

const AdminHome = () => {
    const { user ,totalRevenues} = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    console.log(totalRevenues)
    useEffect(() => {
        dispatch(getAllProducts({}));
        dispatch(getAllUsers({}));
    }, [dispatch]);

    

    if (!user || !products) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-gray-300 min-h-screen p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <Link to="/adminuser">
                        <h2 className="text-xl font-bold mb-2">Total Users</h2>
                        <p className="text-2xl font-bold">{user.length}</p>
                    </Link>
                </div>
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <Link to="/adminproduct">
                        <h2 className="text-xl font-bold mb-2">Total Products</h2>
                        <p className="text-2xl font-bold">{products.length}</p>
                    </Link>
                </div>
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <h2 className="text-xl font-bold mb-2">Sale Price</h2>
                    <p className="text-2xl font-bold">₹ {totalRevenues}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
