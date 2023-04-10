const express = require("express");
const router = express.Router();
const Order = require("../models/order.js");

//update orders
router.put("/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const updates = req.body;

  try {
    const order = await Order.findByIdAndUpdate(isbn, updates, { new: true });
    res.json(order);
  } catch (error) {
    const router = express.Router();
    res.status(400).json({ message: error.message });
  }
});

//active orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ status: "Active" }).sort({
      createdAt: "desc",
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Creating one order
router.post("/add-order", async (req, res) => {
  const order = new Order({
    buyerEmail: req.body.buyerEmail,
    sellerEmail: req.body.sellerEmail,
    orderId: req.body.orderId,
    isbn: req.body.isbn,
    price: req.body.price,
  });
  console.log(order);
  try {
    const newOrder = await order.save();
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
