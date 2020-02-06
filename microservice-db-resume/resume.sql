-- -------------------------------------------------------------
-- TablePlus 3.1.0(290)
--
-- https://tableplus.com/
--
-- Database: resume
-- Generation Time: 2563-02-05 19:13:45.9740
-- -------------------------------------------------------------

CREATE DATABASE resume;

\c resume

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."resume" (
    "metadata" jsonb
);

