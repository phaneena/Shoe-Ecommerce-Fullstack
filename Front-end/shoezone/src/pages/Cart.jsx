import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, removeCart, updateCartQuantity } from "../features/cartSlice";
import { toast } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeCart(id));
    toast.success("Item removed successfully");
  };
  const handleDecrease = (id) => {
    const product = cart.find((item) => item.id === id);
    if (product.quantity > 1) {
      dispatch(
        updateCartQuantity({ productId: id, quantity: product.quantity - 1 })
      ).unwrap();
      toast.success("Quantity decreased successfully");
    }
  };
  const handleIncrease = (id) => {
    const product = cart.find((item) => item.id === id);
    dispatch(
      updateCartQuantity({ productId: id, quantity: product.quantity + 1 })
    )
      .unwrap()
      .then(() => toast.success("Quantity increased successfully"))
      .catch((err) => toast.error(err.message));
  };

  //total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-center mb-6 pt-5">
        YOUR CART
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-lg text-center mb-4">
            Your cart is currently empty.
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl"
          >
            Shop now
          </button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cart.map((product) => (
              <div key={product.id} className="border rounded-lg shadow-lg p-4">
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-full h-60 rounded-t object-cover mb-4"
                />
                <h1 className="text-lg font-semibold text-center">
                  {product.name}
                </h1>
                <p className="text-center text-gray-700">
                  {" "}
                  ₹ {Number(product.price) * Number(product.quantity)}
                </p>
                <p className="text-center text-gray-700">
                  <strong>Quantity :</strong>
                  {product.quantity}
                </p>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center justify-between w-1/3 bg-gray-100 p-2 rounded">
                    <button
                      onClick={() => handleDecrease(product.id)}
                      className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400"
                    >
                      -
                    </button>
                    {product.quantity}
                    <button
                      onClick={() => handleIncrease(product.id)}
                      className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400"
                    >
                      {" "}
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="bg-black text-white px-6 py-2 rounded-2xl w-full mt-4 hover:bg-red-600 text-sm"
                  onClick={() => handleRemove(product.id)}
                >
                  REMOVE
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center sm:items-end">
            <div className="flex items-center justify-between w-full sm:w-auto mb-4">
              <h1 className="text-xl font-semibold">TOTAL: ₹ {totalPrice}</h1>
            </div>
            <button
              className="bg-gray-200 text-black px-8 py-2 rounded-2xl hover:bg-green-900 hover:text-white text-sm"
              onClick={() => navigate("/payment")}
            >
              PLACE YOUR ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
