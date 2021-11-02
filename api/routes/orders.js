const express = require("express");
const router = express.Router();
const { getAllOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrderbyId} = require('../controllers/orders')


router.route("/list").get(getOrder)
router.route("/create").post(createOrder)
router.route("/update/:id").patch(updateOrder)
router.route("/delete/:id").delete(deleteOrder);
router.route("/search/:id").get(getOrderbyId)

module.exports = router;