// volunteerRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('./db'); // Your MySQL connection module

// Login API
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query(
        'SELECT * FROM volunteer WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error('Error during login query:', err);
                // For debugging only—do not expose error details in production
                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
            }
            if (results.length === 0) {
                return res.json({ success: false, message: 'Volunteer not found' });
            }
            const volunteer = results[0];
            if (volunteer.password !== password) {
                return res.json({ success: false, message: 'Incorrect password' });
            }
            return res.json({ success: true, volunteer });
        }
    );
});

// Signup API
router.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // Check if a volunteer with the provided email already exists
    connection.query(
        'SELECT * FROM volunteer WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error('Error during signup query:', err);
                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
            }

            if (results.length > 0) {
                // Email already exists
                return res.json({ success: false, message: 'Email already exists' });
            }

            // Insert new volunteer record
            connection.query(
                'INSERT INTO volunteer (email, password) VALUES (?, ?)',
                [email, password],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting volunteer:', err);
                        return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                    }

                    // Volunteer created successfully
                    return res.json({ success: true, message: 'Volunteer created successfully' });
                }
            );
        }
    );
});

// Add volunteer availability
router.post('/volunteer_availability', (req, res) => {
    const { email, vehicle_size, delivery_radius_km, latitude, longitude } = req.body;
    const sql = `
        INSERT INTO volunteer_availability (email, vehicle_size, delivery_radius_km, latitude, longitude)
        VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(sql, [email, vehicle_size, delivery_radius_km, latitude, longitude], (err, result) => {
        if (err) {
            console.error('Error inserting volunteer availability:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        return res.json({ success: true, message: 'Volunteer availability recorded successfully' });
    });
});

// Add donor info
router.post('/donor', (req, res) => {
    const { name, latitude, longitude } = req.body;
    const sql = `
        INSERT INTO donor_info (name, latitude, longitude)
        VALUES (?, ?, ?)
    `;
    connection.query(sql, [name, latitude, longitude], (err, result) => {
        if (err) {
            console.error('Error inserting donor info:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        return res.json({ success: true, message: 'Donor info added successfully', donorId: result.insertId });
    });
});

// Add food item
router.post('/food_item', (req, res) => {
    const { donor_id, product_name, product_amount, days_before_expiration } = req.body;
    const sql = `
        INSERT INTO food_items (donor_id, product_name, product_amount, days_before_expiration)
        VALUES (?, ?, ?, ?)
    `;
    connection.query(sql, [donor_id, product_name, product_amount, days_before_expiration], (err, result) => {
        if (err) {
            console.error('Error inserting food item:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        return res.json({ success: true, message: 'Food item added successfully', foodItemId: result.insertId });
    });
});

// Create assignment
router.post('/assignment', (req, res) => {
    const { volunteer_email, food_item_id, status } = req.body;
    const sql = `
        INSERT INTO assignments (volunteer_email, food_item_id, status)
        VALUES (?, ?, ?)
    `;
    // Default status is 'assigned' if not provided
    connection.query(sql, [volunteer_email, food_item_id, status || 'assigned'], (err, result) => {
        if (err) {
            console.error('Error creating assignment:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        return res.json({ success: true, message: 'Assignment created successfully', assignmentId: result.insertId });
    });
});

// GET donors along with their food items
router.get('/donor', (req, res) => {
    const sql = `
        SELECT d.id AS donorId, d.name, d.latitude, d.longitude,
               f.id AS foodItemId, f.product_name, f.product_amount, f.days_before_expiration
        FROM donor_info d
        LEFT JOIN food_items f ON d.id = f.donor_id
    `;

    connection.query(sql, (err, results) => {
        console.log("GET /donors route hit");
        if (err) {
            console.error('Error fetching donors:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        // Group donors and their items
        const donorsMap = {};
        for (const row of results) {
            if (!donorsMap[row.donorId]) {
                donorsMap[row.donorId] = {
                    id: row.donorId,
                    name: row.name,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    items: []
                };
            }

            // If there is a matching food item row, add it to the donor's items array
            if (row.foodItemId) {
                donorsMap[row.donorId].items.push({
                    product_name: row.product_name,
                    product_amount: row.product_amount,
                    days_before_expiration: row.days_before_expiration
                });
            }
        }

        // Convert the donors object into an array
        const donorsArray = Object.values(donorsMap);
        return res.json(donorsArray);
    });
});

module.exports = router;
