const asyncHandler = require("../utils/asyncHandler");
const STATUS = require("../utils/constants");
const {
  addOrderService,
  showOrderService,
  verifyPaymentService,
} = require("../services/orderService");

//add order
exports.addOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, address, paymentMethod, total } = req.body;
  const { order, rayzorpayId } = await addOrderService(
    name,
    address,
    paymentMethod,
    total,
    userId
  );
  res
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: "order success",
      order,
      rayzorpayId,
    });
});

//verify payment

exports.verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId, orderId } = req.body;
  try {
    const isPaymentVerified = await verifyPaymentService(paymentId, orderId);

    if (isPaymentVerified) {
      res.status(200).json({
        message: "Payment verified successfully",
      });
    } else {
      throw new CustomError("Payment verification failed", 400);
    }
  } catch (error) {
    console.error("Error in payment verification endpoint:", error);
    res.status(error.status || 500).json({
      message: "Something went wrong during payment verification.",
    });
  }
});

//get all orders

exports.showOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orders } = await showOrderService(userId);
  const message = orders.length
    ? "orders retrived successfully"
    : "no orders found";
  res.status(200).json({ status: STATUS.SUCCESS, message, orders });
});
