const Tasks = require("../models/tasks");
const asyncWrapper = require("../middleware/async");

const getAllOrders = asyncWrapper(async (req, res) => {
    // const orders = await Tasks.find({}).sort({ due_date: -1 });
    const orders = await Tasks.aggregate([
        {
            $project: {
                due_date: { $dateToString: { format: "%G-%m-%d %H:%M:%S", date: "$due_date" } },
                name: 1,
                description: 1,
                is_completed: 1,
            }
        }
    ]);
    res.status(200).json({ orders });
});

const createTask = asyncWrapper(async (req, res, next) => {
    const taskName = req.body.name;
    const task = await Tasks.findOne({ name: taskName });
    if (task) {
        return res.status(404).json({ msg: `Task with same name ${taskName} already exists` });
    } else {
        const taskRes = await Tasks.create(req.body);
        res.status(201).json({ msg:'Daily task create successfully' });
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
    const orders = await Tasks.findOne({
        delivery_date: deliveryDate
     });
    if (!orders) {
        return res.status(404).json({ msg: `No orders with id found` });
    }
    res.status(200).json({ orders });
});

const deleteOrder = asyncWrapper(async (req, res) => {
    const { id: orderID } = req.params;
    const orders = await Tasks.findOneAndDelete({ order_id: orderID });
    if (!orders) {
        return res.status(404).json({ msg: `No orders with id found` });
    }
    res.status(200).json({ orders });
});

const updateOrder = asyncWrapper(async (req, res) => {
    const { id: orderID } = req.params;
    const orders = await Tasks.findOneAndUpdate({ order_id: orderID }, req.body, {
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
    const orders = await Tasks.findOne({ order_id: orderID });
    if (!orders) {
        return res.status(404).json({ msg: `Order with  order id ${orderID} not found` });
    } else {
        res.status(200).json({ id: orderID, body: orders });
    }
});

module.exports = {
  getAllOrders,
  createTask,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderbyId
};
