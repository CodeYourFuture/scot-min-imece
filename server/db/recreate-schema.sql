-- Drop tables in case they already exist
DROP TABLE if exists profiles;
DROP TABLE if exists nationalities;
DROP TABLE if exists users;
DROP TYPE if exists gender;
DROP TYPE if exists profile_type;
DROP TYPE if exists status;

-- Custom Types
CREATE TYPE gender AS ENUM ('female', 'male', 'other', 'not_provided');
CREATE TYPE profile_type AS ENUM ('volunteer', 'service_user');
CREATE TYPE status AS ENUM ('new', 'active', 'inactive');


-- Create tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email    VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE nationalities (
  id           INT PRIMARY KEY,
  nationality   VARCHAR(100) NOT NULL
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  first_name      VARCHAR(100) NOT NULL CHECK (first_name <> ''),
  last_name       VARCHAR(100) NOT NULL CHECK (last_name <> ''),
  date_of_birth   DATE CHECK (date_of_birth > '1920-01-01'),
  gender          gender NOT NULL,
  nationality_id INT REFERENCES nationalities(id),
  email           VARCHAR(200) NOT NULL CHECK (email <> '') UNIQUE,
  address         VARCHAR(200) CHECK (address <> ''),
  phone_number    VARCHAR(50) CHECK (length(phone_number) > 9),
  occupation      VARCHAR(100) CHECK (occupation <> ''),
  type            profile_type NOT NULL,
  status          status NOT NULL DEFAULT 'new',
  join_date       DATE NOT NULL DEFAULT current_date,
  updated_date    DATE,
  last_edited_by  int references users(id)
);

