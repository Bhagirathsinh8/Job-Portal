require('dotenv').config({ quiet: true });

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");


const {serverConfig} = require('./src/utils/constant');
const ConnectDB = require('./src/config/db.config');
const allRoutes = require('./src/routes');
const {globalErrorHandler} = require('./src/utils/errorHandler');

const app = express();
const PORT = serverConfig.PORT;

// Create HTTP server & bind to Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend URL
    methods: ["GET", "POST","PUT","DELETE","PATCH"]
  }
});

// Make Socket.IO available in routes/controllers
app.set('io', io);

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

    // Socket.IO connection event
io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

