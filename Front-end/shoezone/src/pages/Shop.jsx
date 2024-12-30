import { useEffect, useState } from "react";
// import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";
// import axiosInstance from "../api/axiosInstance";
// import { endPoints } from "../api/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/productSlice";

function Shop() {
  //   const [productList, setProductList] = useState([]);
  // const [search,setSearch]=useState('')
  //   const { handleAddToCart } = useContext(shoecontext);
  const dispatch = useDispatch();
  const { products, pagination, loading, error } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (productList) => {
    setSelectedProduct(productList);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  // const handleSearch=(e)=>{
  //     setSearch(e.target.value)
  // }
  // const filteredItems=productList.filter((product)=>{
  //     product.name.toLowerCase().includes(search.toLowerCase())
  // })

  useEffect(() => {
    dispatch(getAllProducts({ page: 1 }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products || products.length === 0) return <div>No products found</div>;

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
                  if (localStorage.getItem("id")) {
                    //   handleAddToCart(product);
                    // toast.success('Item added successfully')
                  } else {
                    toast.success("Must be logged in");
                    navigate("/login");
                  }
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

      {/* modal of product descriptions */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-lg w-full sm:max-w-sm relative max-h-[90vh] overflow-y-auto">
            <IoMdClose
              className="absolute top-4 right-4 cursor-pointer text-3xl text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            />

            <img
              src={selectedProduct.images}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
            <p className="text-gray-700 mb-2">₹ {selectedProduct.price}</p>
            <p className="text-gray-700 mb-2">{selectedProduct.categories}</p>
            <p className="text-gray-600 mb-4">
              {selectedProduct.description || "No description available."}
            </p>

            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 w-full"
              onClick={() => {
                //   handleAddToCart(selectedProduct);
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
