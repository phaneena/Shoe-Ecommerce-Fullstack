import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import { changeFavorite,getFavorite } from "../features/favouriteSlice";
import { fetchUserDetails } from "../features/authSlice";

function Shop() {
  // const [search,setSearch]=useState('')
  const dispatch = useDispatch();
  const {favorite}=useSelector((state)=>state.favorite)
  const { products, pagination, loading, error } = useSelector(
    (state) => state.product
  );
  const {user}=useSelector(state=>state.auth)
  //   const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (productList) => {
    setSelectedProduct(productList);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  //handle page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  // const handleSearch=(e)=>{
  //     setSearch(e.target.value)
  // }
  // const filteredItems=productList.filter((product)=>{
  //     product.name.toLowerCase().includes(search.toLowerCase())
  // })

//get product
  useEffect(() => {
    dispatch(getAllProducts({ page }));
    dispatch(getFavorite())
    dispatch(fetchUserDetails())
  }, [dispatch, page]);


  //addtocart
  const handleAddToCart = (id) => {
    if(user){
        dispatch(addToCart(id));
    toast.success("Added to cart successfully");
    }
    else{
        toast.error("Please login")
    }
  };

  const handleFavorite = async (id) => {
    if(user){
        dispatch(changeFavorite(id)).unwrap();
      toast.success("Updated Favorites");
    }
    else{
        toast.error("Please Login")
    }
      
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(products);

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-10 mb-10">Sneakers</h1>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              onDoubleClick={() => openModal(product)}
            >
              {/* <div className="w-36 h-36 overflow-hidden mb-2"> Set to smaller size */}
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-60 rounded-t object-cover" 
              />
              <h1 className="mt-2 text-lg font-semibold text-center">
                {product.name}
              </h1>
              <p className="mt-1 text-gray-700 text-center">
                ₹ {product.price}
              </p>
              {product.quantity===0 &&(<span className="text-red-500 py-1 px-3">Out of Stock</span>)}
              <div className="flex items-center space-x-2 bg-gray-500">
                {/* Add to Cart Button */}
                <button
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                  onClick={() => {
                    handleAddToCart(product._id);
                  }}
                >
                  Add to Cart
                </button>

                {/* Wishlist Button */}
                <button onClick={() => handleFavorite(product._id)}>
                  {favorite.some((item) => item._id === product._id) ? (
                    <MdFavorite className="text-3xl text-red-500 hover:text-red-600 transition-colors duration-200" />
                  ) : (
                    <MdFavoriteBorder className="text-3xl text-red-700 hover:text-red-800  transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">No products found.</div>
        )}
      </div>
      <ToastContainer autoClose={1000} />


      {/* pagination */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
        >
          Previous
        </button>
        {[...Array(pagination.totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${
              page === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${
            page === pagination.totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* modal of product descriptions */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
            <IoMdClose
              className="absolute top-4 right-4 cursor-pointer text-3xl text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            />
            <img
              src={selectedProduct.images}
              alt={selectedProduct.name}
              className="w-full h-40 sm:h-60 object-cover rounded-lg mb-4"
            />
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              {selectedProduct.name}
            </h1>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ₹ {selectedProduct.price}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> {selectedProduct.categories}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Quantity:</strong> {selectedProduct.quantity}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Description:</strong>{" "}
              {selectedProduct.description || "No description available."}
            </p>

            <div className="flex items-center space-x-2 bg-gray-500">
              {/* Add to Cart Button */}
              <button
                className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                onClick={() => {
                  handleAddToCart(selectedProduct._id);
                  closeModal();
                }}
              >
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button onClick={()=>handleFavorite(selectedProduct._id)} className="relative p-2 rounded-full hover:bg-gray-600 transition duration-300">
              {favorite.includes(selectedProduct._id) ? (
                    <MdFavorite className="text-3xl  text-green-500 hover:text-red-600 transition-colors duration-200" />
                  ) : (
                    <MdFavoriteBorder className="text-3xl hover:text-red-800  transition-colors duration-200" />
                  )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts } from "../features/productSlice";
// import { addToCart } from "../features/cartSlice";
// import { changeFavorite, getFavorite } from "../features/favouriteSlice";
// import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
// import { toast, ToastContainer } from "react-toastify";

// function Shop() {
//   const dispatch = useDispatch();
//   const { favorite } = useSelector((state) => state.favorite);
//   const { products, pagination, loading, error } = useSelector(
//     (state) => state.product
//   );

//   const [page, setPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const categories = ["Men", "Women", "All"]; // Define your categories here

//   // Fetch products
//   useEffect(() => {
//     dispatch(getAllProducts({ page, categories: selectedCategory }));
//     dispatch(getFavorite());
//   }, [dispatch, page, selectedCategory]);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setPage(newPage);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category === "All" ? null : category);
//     setPage(1); // Reset to first page when category changes
//   };

//   const handleAddToCart = (id) => {
//     dispatch(addToCart(id));
//     toast.success("Added to cart successfully");
//   };

//   const handleFavorite = (id) => {
//     dispatch(changeFavorite(id)).unwrap();
//     toast.success("Updated Favorites");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1 className="font-bold text-3xl text-center mt-10 mb-10">Sneakers</h1>

//       {/* Category Filter */}
//       <div className="flex justify-center space-x-4 mb-6">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => handleCategoryChange(category)}
//             className={`py-2 px-4 rounded ${
//               selectedCategory === category
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid */}
//       <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
//             >
//               <img
//                 src={product.images}
//                 alt={product.name}
//                 className="w-full h-60 rounded-t object-cover"
//               />
//               <h1 className="mt-2 text-lg font-semibold text-center">
//                 {product.name}
//               </h1>
//               <p className="mt-1 text-gray-700 text-center">₹ {product.price}</p>
//               <div className="flex items-center space-x-2 bg-gray-500">
//                 <button
//                   className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
//                   onClick={() => handleAddToCart(product._id)}
//                 >
//                   Add to Cart
//                 </button>
//                 <button onClick={() => handleFavorite(product._id)}>
//                   {favorite.some((item) => item._id === product._id) ? (
//                     <MdFavorite className="text-3xl text-red-500" />
//                   ) : (
//                     <MdFavoriteBorder className="text-3xl text-red-700" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center col-span-full">No products found.</div>
//         )}
//       </div>

//       <ToastContainer />

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-10 space-x-4">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//           className={`py-2 px-4 rounded bg-gray-500 text-white ${
//             page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
//           }`}
//         >
//           Previous
//         </button>
//         {[...Array(pagination.totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={`py-2 px-4 rounded ${
//               page === index + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page === pagination.totalPages}
//           className={`py-2 px-4 rounded bg-gray-500 text-white ${
//             page === pagination.totalPages
//               ? "opacity-50 cursor-not-allowed"
//               : "hover:bg-gray-600"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Shop;

