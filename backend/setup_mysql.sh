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
DROP TABLE IF EXISTS
   assignments,
   food_items,
   donor_info,
   volunteer_availability,
   volunteer;

CREATE TABLE volunteer (
   email CHAR(255) PRIMARY KEY,
   password VARCHAR(255) NOT NULL
);


-- volunteer_availability table
CREATE TABLE volunteer_availability (
   id INT AUTO_INCREMENT PRIMARY KEY,
   email CHAR(255),
   vehicle_size ENUM('small', 'medium', 'large'),
   delivery_radius_km INT,
   latitude DOUBLE NOT NULL,
   longitude DOUBLE NOT NULL,
   FOREIGN KEY (email) REFERENCES volunteer(email)
);


-- donor_info table
CREATE TABLE donor_info (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name CHAR(255),
   latitude DOUBLE NOT NULL,
   longitude DOUBLE NOT NULL
);


-- food_items table
CREATE TABLE food_items (
   id INT AUTO_INCREMENT PRIMARY KEY,
   donor_id INT NOT NULL,
   product_name CHAR(255),
   product_amount INT,
   days_before_expiration INT,
   FOREIGN KEY (donor_id) REFERENCES donor_info(id) ON DELETE CASCADE
);


-- assignments table
CREATE TABLE assignments (
   id INT AUTO_INCREMENT PRIMARY KEY,
   volunteer_email CHAR(255),
   food_item_id INT,
   status ENUM('assigned', 'picked_up', 'delivered') DEFAULT 'assigned',
   FOREIGN KEY (volunteer_email) REFERENCES volunteer(email),
   FOREIGN KEY (food_item_id) REFERENCES food_items(id)
);
EOF

echo "MySQL setup complete for database '$DB_NAME'."
