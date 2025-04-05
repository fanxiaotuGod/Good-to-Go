// server.js
const express = require('express');
const app = express();
const volunteerRoutes = require('./volunteerRoutes'); // Import your router
require('./db'); // This will initialize the MySQL connection (if you export it or simply require it to run)

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the volunteer routes under the '/api' path
app.use('/api', volunteerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
