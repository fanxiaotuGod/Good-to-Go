// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const volunteerRoutes = require('./volunteerRoutes'); // Import router
require('./db'); // Initialize MySQL connection

// ✅ CORS setup — allow frontend on localhost:3001
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.88:3000/', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Mount API routes under /api
app.use('/api', volunteerRoutes);

// ✅ Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
