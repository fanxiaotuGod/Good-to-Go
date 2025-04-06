DROP TABLE IF EXISTS
    assignments,
    food_items,
    donor_info,
    volunteer_availability,
    volunteer;

-- volunteer table
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


INSERT INTO donor_info (id, name, latitude, longitude) VALUES (1, 'Fresh Harvest Market', 49.279957, -123.032515);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (2, 'Urban Roots', 49.300966, -123.162134);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (3, 'Greenleaf Grocers', 49.218285, -123.139237);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (4, 'True North Organics', 49.262286, -123.146174);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (5, 'West Coast Co-op', 49.254956, -123.116461);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (6, 'Sunrise Supermart', 49.268535, -123.184622);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (7, 'Maple Market', 49.232676, -123.167788);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (8, 'Local Basket', 49.286471, -123.091422);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (9, 'Pacific Provisions', 49.303051, -123.104311);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (10, 'Natures Fare', 49.247312, -123.078248);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (11, 'Community Foods', 49.246887, -123.081408);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (12, 'Green Planet Market', 49.23788, -123.162624);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (13, 'Good to Go Foods', 49.24143, -123.101356);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (14, 'Healthy Haven', 49.213826, -123.197585);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (15, 'Eco Grocers', 49.305521, -123.17881);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (16, 'Valley Fresh', 49.215867, -123.173954);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (17, 'Harvest Hub', 49.236079, -123.186368);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (18, 'Oceanview Organics', 49.258545, -123.202486);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (19, 'Granville Greens', 49.28532, -123.202267);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (20, 'Sunset Market', 49.284611, -123.113349);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (21, 'Hometown Produce', 49.264717, -123.220012);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (22, 'Farm to Family', 49.214543, -123.082911);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (23, 'Raincity Market', 49.243177, -123.079541);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (24, 'Whole Basket', 49.245091, -123.089388);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (25, 'Fraser Foods', 49.303408, -123.112358);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (26, 'EcoChoice Market', 49.307314, -123.043703);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (27, 'Urban Farms Collective', 49.296997, -123.132931);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (28, 'North Shore Naturals', 49.239318, -123.141112);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (29, 'Daily Fresh', 49.198881, -123.134923);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (30, 'City Market', 49.253336, -123.127008);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (31, 'Peak Produce', 49.27221, -123.098343);



INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (1, 1, 'Canned Beans', 75, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (2, 1, 'Apples', 24, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (3, 1, 'Lettuce', 7, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (4, 1, 'Canned Beans', 73, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (5, 2, 'Apples', 93, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (6, 2, 'Tomatoes', 43, 3);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (7, 2, 'Tomatoes', 55, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (8, 2, 'Milk', 24, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (9, 2, 'Lettuce', 20, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (10, 3, 'Potatoes', 78, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (11, 3, 'Granola Bars', 84, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (12, 3, 'Cheese Block', 83, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (13, 4, 'Cheese Block', 30, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (14, 4, 'Yogurt', 28, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (15, 4, 'Potatoes', 95, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (16, 4, 'Cheese Block', 18, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (17, 4, 'Cheese Block', 28, 3);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (18, 5, 'Pasta', 68, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (19, 5, 'Bananas', 38, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (20, 5, 'Cheese Block', 67, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (21, 5, 'Potatoes', 29, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (22, 6, 'Granola Bars', 86, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (23, 6, 'Lettuce', 11, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (24, 6, 'Bread Loaf', 57, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (25, 6, 'Oranges', 67, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (26, 6, 'Apples', 60, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (27, 7, 'Bread Loaf', 54, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (28, 7, 'Lettuce', 59, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (29, 7, 'Canned Beans', 51, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (30, 8, 'Lettuce', 56, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (31, 8, 'Oranges', 62, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (32, 8, 'Rice', 68, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (33, 8, 'Carrots', 46, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (34, 8, 'Yogurt', 75, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (35, 9, 'Milk', 86, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (36, 9, 'Lettuce', 9, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (37, 9, 'Pasta', 89, 3);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (38, 9, 'Egg Carton', 48, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (39, 9, 'Cereal Box', 29, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (40, 10, 'Cereal Box', 11, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (41, 10, 'Granola Bars', 51, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (42, 10, 'Apples', 60, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (43, 10, 'Oranges', 40, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (44, 11, 'Canned Beans', 16, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (45, 11, 'Bananas', 82, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (46, 11, 'Granola Bars', 58, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (47, 12, 'Tomatoes', 48, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (48, 12, 'Rice', 84, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (49, 12, 'Rice', 8, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (50, 12, 'Lettuce', 48, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (51, 13, 'Bread Loaf', 34, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (52, 13, 'Spinach', 42, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (53, 13, 'Cheese Block', 61, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (54, 14, 'Cheese Block', 24, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (55, 14, 'Lettuce', 21, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (56, 14, 'Cereal Box', 75, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (57, 14, 'Yogurt', 58, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (58, 15, 'Bananas', 90, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (59, 15, 'Cheese Block', 9, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (60, 15, 'Pasta', 77, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (61, 16, 'Granola Bars', 25, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (62, 16, 'Bread Loaf', 65, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (63, 16, 'Cereal Box', 40, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (64, 16, 'Potatoes', 86, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (65, 16, 'Bread Loaf', 91, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (66, 17, 'Pasta', 96, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (67, 17, 'Egg Carton', 36, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (68, 17, 'Potatoes', 62, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (69, 18, 'Pasta', 59, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (70, 18, 'Granola Bars', 44, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (71, 18, 'Cereal Box', 67, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (72, 18, 'Oranges', 82, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (73, 19, 'Granola Bars', 62, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (74, 19, 'Oranges', 56, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (75, 19, 'Bread Loaf', 58, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (76, 20, 'Carrots', 34, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (77, 20, 'Cheese Block', 64, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (78, 20, 'Bread Loaf', 37, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (79, 21, 'Granola Bars', 26, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (80, 21, 'Rice', 13, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (81, 21, 'Bananas', 20, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (82, 22, 'Tomatoes', 58, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (83, 22, 'Spinach', 14, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (84, 22, 'Potatoes', 31, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (85, 22, 'Apples', 10, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (86, 22, 'Carrots', 83, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (87, 23, 'Bread Loaf', 56, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (88, 23, 'Spinach', 75, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (89, 23, 'Potatoes', 68, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (90, 24, 'Bananas', 84, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (91, 24, 'Milk', 25, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (92, 24, 'Bananas', 53, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (93, 24, 'Cereal Box', 80, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (94, 25, 'Spinach', 91, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (95, 25, 'Pasta', 99, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (96, 25, 'Potatoes', 57, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (97, 25, 'Bananas', 80, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (98, 25, 'Pasta', 7, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (99, 26, 'Apples', 37, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (100, 26, 'Cheese Block', 15, 3);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (101, 26, 'Lettuce', 23, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (102, 27, 'Tomatoes', 31, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (103, 27, 'Egg Carton', 36, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (104, 27, 'Lettuce', 65, 3);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (105, 27, 'Granola Bars', 90, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (106, 27, 'Egg Carton', 21, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (107, 28, 'Oranges', 65, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (108, 28, 'Cereal Box', 46, 10);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (109, 28, 'Apples', 98, 5);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (110, 28, 'Apples', 45, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (111, 29, 'Granola Bars', 57, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (112, 29, 'Yogurt', 76, 6);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (113, 29, 'Carrots', 73, 3);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (114, 30, 'Canned Beans', 15, 2);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (115, 30, 'Egg Carton', 33, 9);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (116, 30, 'Bread Loaf', 53, 7);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (117, 30, 'Tomatoes', 47, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (118, 30, 'Apples', 15, 8);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (119, 31, 'Bread Loaf', 82, 4);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (120, 31, 'Cereal Box', 88, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (121, 31, 'Potatoes', 29, 1);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (122, 31, 'Bananas', 35, 3);
INSERT INTO food_items (id, donor_id, product_name, product_amount, days_before_expiration) VALUES (123, 31, 'Milk', 33, 4);