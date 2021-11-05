import { getProfileByEmail } from "../api/profiles";

export const validateInput = ({
  first_name,
  last_name,
  phone_number,
  gender,
  type,
  email,
  date_of_birth,
  nationality_id,
  address,
  status,
  join_date
}) => {
  let errs = [];
  if (first_name.length === 0) {
    errs.push("First name cannot be empty");
  }
  if (last_name.length === 0) {
    errs.push("Last name cannot be empty");
  }
  if (phone_number.length < 10) {
    errs.push("Phone number must have at least 10 digits");
  }
  if (gender.length === 0) {
    errs.push("Gender cannot be empty");
  }
  if (type.length === 0) {
    errs.push("Profile type cannot be empty");
  }
  if (email.length === 0) {
    errs.push("Email cannot be empty");
  }
  if (date_of_birth.length === 0) {
    errs.push("Date of birth cannot be empty");
  }
  if (nationality_id.length === 0) {
    errs.push("Nationality cannot be empty");
  }
  if (address.length === 0) {
    errs.push("Address cannot be empty");
  }
  if (status.length === 0) {
    errs.push("Status cannot be empty");
  }
  if (join_date.length === 0) {
    errs.push("Join date cannot be empty");
  }

  return errs;
};

/* 
  first_name      VARCHAR(100) NOT NULL CHECK (first_name <> ''), *
  last_name       VARCHAR(100) NOT NULL CHECK (last_name <> ''), *
  date_of_birth   DATE CHECK (date_of_birth > '1920-01-01'),
  gender          gender NOT NULL, *
  nationality_id INT REFERENCES nationalities(id),
  email           VARCHAR(200) NOT NULL CHECK (email <> '') UNIQUE,*
  address         VARCHAR(200) CHECK (address <> ''),
  phone_number    VARCHAR(50) CHECK (length(phone_number) > 9), *
  occupation      VARCHAR(100) CHECK (occupation <> ''), 
  type            profile_type NOT NULL, *
  status          status NOT NULL DEFAULT 'new',
  join_date       DATE NOT NULL DEFAULT current_date,





  group_name   VARCHAR(100) NOT NULL */
