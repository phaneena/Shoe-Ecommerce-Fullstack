import { useEffect, useState } from "react";
// import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";
// import axiosInstance from "../api/axiosInstance";
// import { endPoints } from "../api/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";

function Shop() {
  // const [search,setSearch]=useState('')
  const dispatch = useDispatch();
  const { products, pagination, loading, error } = useSelector(
    (state) => state.product
  );
//   const navigate = useNavigate();
  const [page,setPage]=useState(1)
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

  useEffect(() => {
    dispatch(getAllProducts({ page}));
  }, [dispatch,page]);

  //addtocart
  const handleAddToCart=(id)=>{
    dispatch(addToCart(id))
    toast.success('Added to cart successfully')
  }

  if (loading){
    return <div>Loading...</div>;
  }
  if (error){
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
                className="w-full h-60 rounded-t object-cover" // Full width and height of the container
              />
              <h1 className="mt-2 text-lg font-semibold text-center">
                {product.name}
              </h1>
              <p className="mt-1 text-gray-700 text-center">
                {" "}
                ₹ {product.price}
              </p>
              <button
                className="w-full mt-3 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                onClick={() => {
                    handleAddToCart(product._id)
                //   if (localStorage.getItem("id")) {
                //     addToCart(product);
                //     toast.success('Item added successfully')
                //   } else {
                //     toast.success("Must be logged in");
                //     navigate("/login");
                //   }
                }} // Call the add to cart function
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">No products found.</div>
        )}
      </div>
      <ToastContainer />

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
      <p className="text-gray-700 mb-2"><strong>Price:</strong> ₹ {selectedProduct.price}</p>
      <p className="text-gray-700 mb-2">
        <strong>Category:</strong> {selectedProduct.categories}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Quantity:</strong>{" "}
        {selectedProduct.quantity}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong>{" "}
        {selectedProduct.description || "No description available."}
      </p>
      
      <button
        className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 w-full"
        onClick={() => {
          addToCart(selectedProduct);
          closeModal();
        }}
      >
        Add to Cart
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default Shop;
