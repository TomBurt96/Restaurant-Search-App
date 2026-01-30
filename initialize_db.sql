
DROP DATABASE IF EXISTS rest_app_db;

-- Create a restaurant app database     
CREATE DATABASE rest_app_db
    WITH OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c rest_app_db;

CREATE EXTENSION IF NOT EXISTS postgis;

-- Create a the restaurant schema
CREATE SCHEMA IF NOT EXISTS restaurant;

-- Set the search path to include the new schema
-- SET search_path TO restaurant_schema, public;

CREATE TABLE restaurant.staging(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    food_type VARCHAR(100),
    address VARCHAR(100),
    neighborhood VARCHAR(50),
    price_range VARCHAR(5),
    rating DECIMAL(2, 1),
    phone_number VARCHAR(15),
    website VARCHAR(100),
    delivery BOOLEAN,
    notes VARCHAR(1000),
    position TEXT
);

-- Create a table within restaurant_scehama schema to match your CSV structure
CREATE TABLE restaurant.boston(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    food_type VARCHAR(100),
    address VARCHAR(100),
    neighborhood VARCHAR(50),
    price_range VARCHAR(5),
    rating DECIMAL(2, 1),
    phone_number VARCHAR(15),
    website VARCHAR(100),
    delivery BOOLEAN,
    notes VARCHAR(1000),
    position GEOMETRY(Point, 4326)
);
-- Load data from the CSV file into the table
-- Adjust DELIMITER, CSV HEADER, and ENCODING as needed based on your CSV file.
COPY restaurant.staging (name, food_type, address, neighborhood, price_range, rating, phone_number, website, delivery, notes, position) 
FROM '/csvs/boston_restaurants_100.csv' DELIMITER ',' CSV HEADER;

-- 3. Move data to the REAL table, converting coordinates to Geometry
INSERT INTO restaurant.boston (name, food_type, address, neighborhood, price_range, rating, phone_number, website, delivery, notes, position)
SELECT
    name, food_type, address, neighborhood, price_range, 
    rating, phone_number, website, delivery, notes,
    ST_SetSRID(
        ST_MakePoint(
            -- Use REPLACE to strip '(' and split_part to get the first number
            TRIM(REPLACE(split_part(position, ',', 1), '(', ''))::double precision, -- Longitude
            -- Use REPLACE to strip ')' and split_part to get the second number
            TRIM(REPLACE(split_part(position, ',', 2), ')', ''))::double precision  -- Latitude
        ), 
    4326)
FROM restaurant.staging;

-- 4. Clean up
DROP TABLE restaurant.staging;
SELECT * FROM restaurant.boston LIMIT 5;
SELECT name, ST_AsText(position) FROM restaurant.boston LIMIT 5;
