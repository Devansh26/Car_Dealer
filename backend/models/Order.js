const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_datetime: {
    type: Date,
    required: true,
    default: Date.now
  },
  order_status: {
    type: String,
    required: true,
    default: 'Pending'
  },
  delivery_date: {
    type: Date,
    required: true
  },
  order_message: {
    type: String,
    required: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;