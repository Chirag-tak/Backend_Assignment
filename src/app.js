require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));