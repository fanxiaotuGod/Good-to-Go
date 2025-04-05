// volunteerRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('./db'); // Your MySQL connection module

// Login API
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the volunteer table by email
    connection.query(
        'SELECT * FROM volunteer WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error('Error during login query:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (results.length === 0) {
                // No volunteer with that email found
                return res.json({ success: false, message: 'Volunteer not found' });
            }

            const volunteer = results[0];
            // Check if password matches (in production, compare hashed values)
            if (volunteer.password !== password) {
                return res.json({ success: false, message: 'Incorrect password' });
            }

            // Successful login
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
                return res.status(500).json({ success: false, message: 'Database error' });
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
                        return res.status(500).json({ success: false, message: 'Database error' });
                    }

                    // Volunteer created successfully
                    return res.json({ success: true, message: 'Volunteer created successfully' });
                }
            );
        }
    );
});

module.exports = router;
