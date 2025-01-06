// import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { verifypayment, addOrder } from "../features/orderSlice";

function PaymentDetail() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    address: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
  });
  //total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  // Razorpay Payment Handler
  const openRazorpayPayment = (razorpayOrderId, amount, name) => {
    const options = {
      key: "rzp_test_GcYeDXpTqSAVpK",
      amount: amount,
      currency: "INR",
      name: "Shoezone",
      description: "Product Payment",
      order_id: razorpayOrderId,
      handler: (response) => {
        const paymentData = {
          paymentId: response.razorpay_payment_id,
          orderId: razorpayOrderId,
        };
        console.log(paymentData);
        dispatch(verifypayment(paymentData))
          .unwrap()
          .then(() => navigate("/"))
          .catch((error) => {
            console.error("Payment verification failed:", error); 
            toast.error("Payment verification failed. Try again.");
          });
      },
      prefill: {
        name: name,
      },
      theme: {
        color: "#F37254",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const onSubmit = async (values) => {
    try {
      const orderData = {
        ...values,
        items: cart,
        total: totalPrice,
        paymentMethod: "razorpay",
      };
      const response = await dispatch(addOrder(orderData)).unwrap();
      console.log(response);
      const { razorpayOrderId, amount } = response;
      openRazorpayPayment(razorpayOrderId, amount, values.name);
    } catch (error) {
      toast.error(error || "Failed to place order");
    }
  };

  return (
    <div className="p-4 sm:p-8 md:w-3/4 lg:w-2/3 mx-auto">
      <h1 className="text-center text-2xl font-semibold mb-6">PAYMENT DETAILS</h1>
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 mt-1 text-sm"
            ></ErrorMessage>
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <Field
              as="textarea"
              id="address"
              name="address"
              rows="4"
              className="flex justify-center w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            ></ErrorMessage>
          </div>
          <div>
            <h1 className="text-lg font-semibold mt-6 mb-2">Order Summary</h1>
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between py-2 border-b text-sm md:text-base"
              >
                <p>{product.name}  <strong>X</strong>  <strong>{product.quantity}</strong></p>

                <p> ₹ {Number(product.price) * Number(product.quantity)}</p>
              </div>
            ))}
            <p className="text-right font-semibold mt-2">
             <strong>Total </strong> : ₹ {totalPrice}
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Proceed to Payment
            </button>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
}
export default PaymentDetail;
