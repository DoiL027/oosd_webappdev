ALTER TABLE students
  MODIFY COLUMN phone VARCHAR(30) NULL,
  MODIFY COLUMN street_address VARCHAR(255) NULL,
  MODIFY COLUMN city VARCHAR(100) NULL,
  MODIFY COLUMN province_state VARCHAR(100) NULL,
  MODIFY COLUMN country VARCHAR(100) NULL,
  MODIFY COLUMN postal_code VARCHAR(12) NULL,
  ADD COLUMN photo VARCHAR(255) NULL,
  ADD COLUMN badge VARCHAR(100) NULL;

INSERT IGNORE INTO students
  (first_name, last_name, email, program, year, photo, badge)
VALUES
  ('Andrew', 'Maje', 'andrew.maje@school.edu', 'Computer Science', '2026', '/64.jpg', 'Full-time'),
  ('Alvin', 'Zhao', 'alvin.zhao@school.edu', 'Software Engineering', '2026', '/66.jpg', 'Mentor'),
  ('Angie', 'Chico', 'angie.chico@school.edu', 'Data Science', '2027', '/65.jpg', 'Research'),
  ('Ray', 'Amuro', 'ray.amuro@school.edu', 'Cybersecurity', '2027', '/64.jpg', 'Intern'),
  ('Trisha', 'Aliermo', 'trisha.aliermo@school.edu', 'UX Design', '2025', '/65.jpg', 'Leader'),
  ('Hathaway', 'Noa', 'hathaway.noa@school.edu', 'Artificial Intelligence', '2025', '/64.jpg', 'Capstone');
