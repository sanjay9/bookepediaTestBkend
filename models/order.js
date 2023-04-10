const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  isbn: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: "Active" },
});

module.exports = mongoose.model("Orders", orderSchema);
