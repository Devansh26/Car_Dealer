// controllers/vehicleController.js
const moment = require('moment');
const Vehicle = require("../models/Vehicle");
const Order = require("../models/Order");

// GET all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a vehicle by ID
exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Buy a vehicle
exports.buyVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ status: false, message: "Vehicle not found" });
        }

        // Create a new order
        const order = new Order({
            vehicle_id: vehicle._id,
            user_id: req.userId, // Assuming req.userId is set by the auth middleware
            delivery_date: moment().add(2, 'months').toDate(), // Set delivery date to 2 months from now
            order_message: "Please visit our nearest showroom for documentation and payment.", 
        });

        await order.save();

        res.status(200).json({
            status: true,
            message: "Vehicle purchased successfully",
            order,
        });
    } catch (err) {
        res.status(500).json({ 
          status: false,
          message: err.message });
    }
};

