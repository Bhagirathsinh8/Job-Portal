require('dotenv').config({ quiet: true });

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const {serverConfig} = require('./src/utils/constant');
const ConnectDB = require('./src/config/db.config');
const allRoutes = require('./src/routes');
const {globalErrorHandler} = require('./src/utils/errorHandler');

const app = express();
const PORT = serverConfig.PORT;

// Middleware setup
app.use(cors({ origin: '*', credentials: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB Server
ConnectDB();

// API routes
app.use('/api', allRoutes);

// Global error handler
app.use(globalErrorHandler);

//Server Health check
app.get('/', (req, res) => {
    res.send('Job Portal server is running');
    });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

if (process.env.VERCEL) {
  // Vercel will import and use the exported handler
  module.exports = { handler: serverless(app) };
} else {
  // Local development
  const PORT = serverConfig.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}