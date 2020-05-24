DROP DATABASE IF EXISTS store_rating_db;

CREATE DATABASE store_rating_db;

\c store_rating_db ;

DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

CREATE TABLE stores (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    st_zip VARCHAR(255) NOT NULL,
    img_lnk VARCHAR(255) NOT NULL
);

CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY,
    customer INTEGER NOT NULL,
    store INTEGER NOT NULL,
    product INTEGER NOT NULL,
    service INTEGER NOT NULL,
    cleanliness INTEGER NOT NULL,
    overall INTEGER NOT NULL,
    comment VARCHAR(511) NOT NULL
);
