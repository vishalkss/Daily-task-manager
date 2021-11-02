const express = require("express");
const router = express.Router();
const { getAllOrders,
    createTask,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrderbyId} = require('../controllers/tasks')


router.route("/get-all-tasks").get(getAllOrders)
router.route("/create").post(createTask)
router.route("/update/:id").patch(updateOrder)
router.route("/delete/:id").delete(deleteOrder);
router.route("/search/:id").get(getOrderbyId)

module.exports = router;