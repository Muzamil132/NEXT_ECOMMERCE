const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderamount: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },

      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  shippingAddress: {
    Address: { type: String, required: true },
    City: { type: String, required: true },
    PostalCode: { type: String, required: true },
    Country: { type: String, required: true },
  },

  isPaid: {
    type: Boolean,
  },
  ordercreatedAt: {
    type: Date,
  },
  orderPaidAt: {
    type: Date,
  },
  paymentDetails: {
    id: String,
    amount: Number,
  },
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
