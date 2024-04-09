// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const auth = require('../middlewares/auth');
const data = [];

// GET all vehicles (protected route)
router.get('/', auth, vehicleController.getAllVehicles);

// GET a vehicle by ID (protected route)
router.get('/:id', auth, vehicleController.getVehicleById);

// Buy a vehicle (protected route)
router.post('/buy/:id', auth, vehicleController.buyVehicle);


module.exports = router;
