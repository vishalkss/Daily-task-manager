const Orders = require("../models/orders");
const asyncWrapper = require("../middleware/async");

const getAllOrders = asyncWrapper(async (req, res) => {
    const orders = await Orders.find({}).sort({ delivery_date: -1 });
    res.status(200).json({ orders });
});

const createOrder = asyncWrapper(async (req, res) => {
    const orderID = req.body.order_id;
    const orders = await Orders.findOne({ order_id: orderID });
    if (orders) {
        return res.status(404).json({ msg: `Order with same order id ${orderID} already exists` });
    } else {
        const orders = await Orders.create(req.body);
        res.status(201).json({ orders });
    }
});

const getOrder = asyncWrapper(async (req, res) => {
    const deliveryDate = req.body.delivery_date;
    if (Object.keys(req.body).length === 0 || deliveryDate==""){
        return res.status(401).json({ msg: `Please enter delivery date` });
    }

    let pattern = /^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/;
    if (!pattern.test(deliveryDate)){
        return res.status(401).json({ msg: `Please enter delivery date in yyyy/mm/dd format` });
    }
    const orders = await Orders.findOne({
        delivery_date: deliveryDate
     });
    if (!orders) {
        return res.status(404).json({ msg: `No orders with id found` });
    }
    res.status(200).json({ orders });
});

const deleteOrder = asyncWrapper(async (req, res) => {
    const { id: orderID } = req.params;
    const orders = await Orders.findOneAndDelete({ order_id: orderID });
    if (!orders) {
        return res.status(404).json({ msg: `No orders with id found` });
    }
    res.status(200).json({ orders });
});

const updateOrder = asyncWrapper(async (req, res) => {
    const { id: orderID } = req.params;
    const orders = await Orders.findOneAndUpdate({ order_id: orderID }, req.body, {
        new: true,
        runValidators: true
    });
    if (!orders) {
        return res.status(404).json({ msg: `No orders with id found` });
    }
    res.status(200).json({ id: orderID, body: orders });
  });

const getOrderbyId = asyncWrapper(async (req, res) => {
    const { id: orderID } = req.params;
    console.log(
        "orderID", orderID
    )
    const orders = await Orders.findOne({ order_id: orderID });
    if (!orders) {
        return res.status(404).json({ msg: `Order with  order id ${orderID} not found` });
    } else {
        res.status(200).json({ id: orderID, body: orders });
    }
});

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderbyId
};
