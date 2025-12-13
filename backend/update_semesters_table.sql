-- Add missing columns for special registration if they don't exist
-- Note: MySQL doesn't support "IF NOT EXISTS" for ADD COLUMN directly in all versions easily without a procedure, 
-- but running this might fail if columns exist. 
-- Better to check manually or use a procedure.

-- Run this in your MySQL client if you are missing these columns:

ALTER TABLE semesters
ADD COLUMN registration_special_open_date DATETIME NULL,
ADD COLUMN registration_special_close_date DATETIME NULL;
