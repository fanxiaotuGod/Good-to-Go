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


INSERT INTO donor_info (id, name, latitude, longitude) VALUES (1, 'UBC Bookstore', 49.2652851856704, -123.25045920530934);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (2, 'Kinton Ramen UBC', 49.266174327986434, -123.24860311674384);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (3, 'Kokoro Tokyo Mazesoba - UBC', 49.266555624011545, -123.24122608245861);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (4, 'Save-On-Foods', 49.2551111018911, -123.23547452415141);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (5, 'UBC Farm', 49.25082116352407, -123.23926581377992);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (6, 'COBS Bread', 49.23444411841751, -123.1580440179719);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (7, 'Strongs Market', 49.24999473298377, -123.17855123004641);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (8, 'Choices Market', 49.25884617753108, -123.17082646838641);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (9, 'Loblaws City Market Arbutus', 49.259182277055174, -123.14473394011266);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (10, 'IGA', 49.27027227732976, -123.17940953689752);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (11, 'Simons NOFRILLS Vancouver', 49.26915218844862, -123.19554570569841);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (12, 'Safeway King Edward Mall', 49.250442945539966, -123.1188130732091);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (13, 'Nesters Market', 49.2449520613268, -123.10061696796559);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (14, 'Whole Foods Market', 49.26904017816183, -123.14696553792554);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (15, 'Fresh St Market Vancouver House', 49.276880284101736, -123.14044240585712);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (16, 'Subway', 49.25972779608241, -123.16447504492496);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (17, 'Freshii', 49.254910204105215, -123.22644479957515);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (18, 'Walmart Supercentre', 49.18082842300297, -123.10856902874724);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (19, 'FreshCo No 2 & Blundell', 49.15613594405797, -123.1494244348601);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (20, 'Acme Grocery Store', 49.194740575675546, -123.07698333662638);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (21, 'Real Canadian Superstore Marine Drive', 49.21178884587428, -123.07732665936683);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (22, 'Millers Your Independent Grocer Vancouver', 49.22255314625553, -123.02720153926195);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (23, 'Polo Market', 49.22905544173232, -123.10307586490015);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (24, 'Buy-Low Foods', 49.23286673436853, -123.09140289172504);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (25, 'Osaka Supermarket', 49.19070196659415, -123.14564788471522);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (26, 'Safeway Seafair', 49.152318734567174, -123.18375670727563);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (27, 'Foody World', 49.19228530121833, -123.12906233565977);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (28, 'No. 9 Restaurant', 49.17602100273758, -123.14049508261998);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (29, 'The Boss Restaurant', 49.222093443724575, -123.0058833147471);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (30, 'Famous Foods', 49.251220978279875, -123.05507729169256);
INSERT INTO donor_info (id, name, latitude, longitude) VALUES (31, 'Fat Boy Kitchen', 49.221810527771446, -123.05164733179807);



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