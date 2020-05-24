\c store_rating_db;

TRUNCATE TABLE stores CASCADE;
TRUNCATE TABLE reviews CASCADE;
TRUNCATE TABLE customers CASCADE;

INSERT INTO stores (id, name, street, city, st_zip, img_lnk) VALUES (1, 'Garden Cafe', '1106 E. I-30', 'Rockwall', 'TX 75087', 'http://localhost:8899/Garden.jpg');
INSERT INTO stores (id, name, street, city, st_zip, img_lnk) VALUES (2, 'Red Robin', '150 Town Center Blvd', 'Garland', 'TX 75040', 'http://localhost:8899/Red_Robin.jpg');
INSERT INTO stores (id, name, street, city, st_zip, img_lnk) VALUES (3, 'Woodshed', '190 E. Stacy Rd', 'Allen', 'TX 75002', 'http://localhost:8899/Woodshed.jpg');
INSERT INTO stores (id, name, street, city, st_zip, img_lnk) VALUES (4, 'Buca', '2740 N. Central Exwy.', 'Plano', 'TX 75074', 'http://localhost:8899/Buca.jpg');
INSERT INTO stores (id, name, street, city, st_zip, img_lnk) VALUES (5, 'Arbys', '7909 Lyndon B Johnson', 'Dallas', 'TX 75251', 'http://localhost:8899/Arbys.jpg');
INSERT INTO customers (id, name, email, password) VALUES (1, 'customer1', 'c1@email.com', '111');
INSERT INTO customers (id, name, email, password) VALUES (2, 'customer2', 'c2@email.com', '111');
INSERT INTO customers (id, name, email, password) VALUES (3, 'customer3', 'c3@email.com', '111');
INSERT INTO customers (id, name, email, password) VALUES (4, 'customer4', 'c4@email.com', '111');
INSERT INTO customers (id, name, email, password) VALUES (5, 'customer5', 'c5@email.com', '111');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (1, 1, 1, 5, 1, 5, 5, 'Great food. Long wait.');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (2, 1, 2, 4, 2, 4, 4, 'Great food. Pricey');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (3, 2, 3, 3, 3, 3, 3, 'Average food. Average service');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (4, 2, 4, 2, 4, 2, 2, 'New menu not so good. Pricey');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (5, 3, 5, 1, 5, 1, 1, 'Most dishes sold out early. Shady location');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (6, 3, 1, 5, 1, 5, 5, 'People got to try their specialty dishes');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (7, 4, 2, 4, 2, 4, 4, 'Good menu. Crowded place');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (8, 4, 3, 3, 3, 3, 3, 'Small store. Big taste');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (9, 5, 4, 2, 4, 2, 2, 'Fast service. Small menu');
INSERT INTO reviews (id, customer, store, product, service, cleanliness, overall, comment) VALUES (10, 5, 5, 1, 5, 1, 1, 'Fast service. Few patrons');
