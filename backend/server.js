const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());


// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    // No options needed
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
