
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const express = require('express');

const cors = require('cors'); // Import the cors middleware

const bodyParser = require('body-parser');

const app = express();
app.listen(port, () => console.log(`Server running on port ${port}`));

const dbURI = 'mongodb+srv://commonemail098:iH2dbdKyelZzOXk4@cardealership.q2ynqna.mongodb.net/?retryWrites=true&w=majority&appName=carDealership';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));
