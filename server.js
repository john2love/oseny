require('dotenv').config(); // ✅ Load environment variables
const express = require('express');
const cors = require('cors');
const cloudinary = require('./config/cloudinary'); // Import Cloudinary setup
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/Db'); // Import the database connection function

const app = express();

// Connect to MongoDB
connectDB();

// CORS options
const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Enable form data parsing
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);

// Validate essential environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGO_URI', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1); // Exit the application with an error code
  }
});

// Debugging logs
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing!");
console.log("Cloudinary Configured Successfully!");

// Testing the root API
app.get('/', (req, res) => {
  res.send('NewGen Backend Running...');
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: '❌ Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: '❌ Internal server error' });
});

// Server configuration
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';

// Start the server
const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`🚀 Server running on http://${SERVER_HOST}:${SERVER_PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof SERVER_PORT === 'string' ? 'Pipe ' + SERVER_PORT : 'Port ' + SERVER_PORT;
  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
