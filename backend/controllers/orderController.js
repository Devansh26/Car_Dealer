const Order = require("../models/Order");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

// Get user orders with vehicle details
exports.getUserOrders = async (req, res) => {
    try {
        // Find all orders for the authenticated user
        const orders = await Order.find({ user_id: req.userId }).populate(
            "vehicle_id"
        );

        // Extract the order details and vehicle details from the populated orders
        const orderDetails = orders.map((order) => {
            return {
                vehicle: {
                    vehicle_id: order.vehicle_id._id,
                    make: order.vehicle_id.make,
                    model: order.vehicle_id.model,
                    year: order.vehicle_id.year,
                    color: order.vehicle_id.color,
                    KMs: order.vehicle_id.KMs,
                    VIN: order.vehicle_id.VIN,
                    price: order.vehicle_id.price,
                    images: order.vehicle_id.images,
                },
                order_id: order._id,
                order_datetime: order.order_datetime,
                order_status: order.order_status,
                delivery_date: order.delivery_date,
            };
        });

        // Prepare the response object
        const response = {
            orders: orderDetails,
            status: "true",
            message: "User orders retrieved successfully",
            count: orderDetails.length,
        };

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};


// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ status: false, message: 'Order not found' });
    }

    // Check if the order belongs to the authenticated user
    if (order.user_id.toString() !== req.userId) {
      return res.status(403).json({ status: false, message: 'You are not authorized to cancel this order' });
    }

    // Update the order status to 'Canceled'
    order.order_status = 'Canceled';
    const updatedOrder = await order.save();

    res.status(200).json({ status: true, message: 'Order canceled successfully', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};