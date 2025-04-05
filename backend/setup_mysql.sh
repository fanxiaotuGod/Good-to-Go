#!/bin/bash
# This script sets up the local MySQL database and table for the Good-to-Go project.

# Configuration - adjust these values if necessary
DB_NAME="good_to_go"
DB_USER="root"
DB_PASSWORD="yournewpassword"

echo "Setting up MySQL database: $DB_NAME"

# Create the database if it doesn't exist
mysql -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\`;"

echo "Using database: $DB_NAME"
# Execute SQL commands to drop the volunteer table (if it exists) and create a new one
mysql -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
DROP TABLE IF EXISTS volunteer;
CREATE TABLE volunteer (
    email CHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    vehicle_size ENUM('small', 'medium', 'large'),
    delivery_radius_km INT,
    available_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EOF

echo "MySQL setup complete for database '$DB_NAME'."
