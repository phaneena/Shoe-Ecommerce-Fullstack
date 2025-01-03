const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cart",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    name: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "pending", "cancelled"],
    },
    razorpayPaymentStatus: {
      type: String,
      enum: ["paid", "failed", "pending", "captured", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
