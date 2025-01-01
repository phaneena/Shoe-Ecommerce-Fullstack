import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite, changeFavorite } from '../features/favouriteSlice';
import { addToCart } from "../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { favorite, loading, error } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(getFavorite());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-700 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{`Error: ${error}`}</div>;
  }

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
    toast.success("Added to cart");
  };

  const handleFavorite = (id) => {
    dispatch(changeFavorite(id));
    toast.success('Updated Favorite');
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Favorites</h2>
      {favorite.length === 0 ? (
        <h3 className="text-center text-lg text-gray-500">You have no favorite products.</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorite.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <img src={product.images} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                <p className="text-gray-600 text-sm">₹ {product.price}</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
                {/* Add to Cart Button */}
                <button
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>

                {/* Wishlist Button */}
                <button onClick={() => handleFavorite(product._id)} className="ml-2">
                  {favorite.some((item) => item._id === product._id) ? (
                    <MdFavorite className="text-3xl text-red-500 hover:text-red-600 transition-colors duration-200" />
                  ) : (
                    <MdFavoriteBorder className="text-3xl hover:text-red-800 transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
