-- Drop tables in case they already exist
DROP TABLE if exists users;
DROP TABLE if exists profiles;
DROP TYPE if exists gender;

-- Custom Types
CREATE TYPE gender AS ENUM ('female', 'male', 'other', 'not_provided');

-- Create tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email    VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  date_of_birth   DATE,
  gender          gender NOT NULL,
  email           VARCHAR(200) NOT NULL UNIQUE,
  address         VARCHAR(200),
  phone_number    VARCHAR(50),
  occupation      VARCHAR(100)
);
