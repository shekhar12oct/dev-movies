// entry point of my node-js applications
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Add CORS middleware before routes
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Local Vite frontend
      'http://13.48.57.230', // Public IP of your EC2 frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
