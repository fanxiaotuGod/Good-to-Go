// volunteerRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('./db'); // Your MySQL connection module

// Login API
// Example for login (do similar for signup)
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
                return res.status(500).json({ success: false, message: 'Database error' , error: err.message});
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
                        return res.status(500).json({ success: false, message: 'Database error' , error: err.message});
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


module.exports = router;
