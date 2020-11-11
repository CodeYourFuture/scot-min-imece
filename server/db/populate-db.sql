-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. This is very bad from security point of view. We will have a task to encrypt the passwords
INSERT INTO users (email, password) values ('admin@cyf.org', 'admin_password');
INSERT INTO users (email, password) values ('user@cyf.org', 'user_password');

INSERT INTO profiles (first_name, last_name, gender, email) values ('Fatma', 'Oymak', 'female', 'sun@cyf.org');
INSERT INTO profiles (first_name, last_name, gender, email) values ('Su', 'Oymak', 'female', 'water@cyf.org');
INSERT INTO profiles (first_name, last_name, gender, email, address) values ('Gun', 'Ozguven', 'male', 'bedizma@cyf.org', '29, White hart lane, N8 1UG');
INSERT INTO profiles (first_name, last_name, gender, date_of_birth, email, address) values ('Arda', 'Acar', 'male', '2008-07-30', 's@cyf.org', '1 Glasgow street, Edinburgh');
INSERT INTO profiles (first_name, last_name, gender, date_of_birth, email, address) values ('Natalia', 'Andrei', 'female', '1950-07-05', 'nat_and@cyf.org', '176 Battal Gazi sok., Dalaman');
INSERT INTO profiles (first_name, last_name, gender, date_of_birth, email, address) values ('Rares', 'Smith', 'male', '1989-10-15', 'rares_smith@cyf.org', '6 Seyfettin ince cad., Dalaman');
INSERT INTO profiles (first_name, last_name, gender, date_of_birth, email, address, phone_number, occupation) values ('Mimi', 'Mouse', 'female', '1967-01-30', 'happy_mood@cyf.org', '176 Battal Gazi sok., Dalaman', '+44 1345 56788', 'teacher');

COPY nationalities(nationality)
FROM '/home/coder/codeyourfuture/scot-min-imece/nationalities.csv'
DELIMITER ','
CSV HEADER;