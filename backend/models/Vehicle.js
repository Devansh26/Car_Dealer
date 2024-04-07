// models/Vehicle.js
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    KMs: { type: Number, required: true },
    VIN: { type: String, required: true },
    price: { type: Number, required: true },
    
    // Uncomment later when you have the images
    images: { type: Array, required: true },
    // Add any other fields you need for vehicles
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
