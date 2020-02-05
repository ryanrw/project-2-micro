-- -------------------------------------------------------------
-- TablePlus 3.1.0(290)
--
-- https://tableplus.com/
--
-- Database: users
-- Generation Time: 2563-02-05 19:13:45.9740
-- -------------------------------------------------------------

CREATE DATABASE users;

\c users

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "userid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "username" varchar(32) NOT NULL,
    "email" varchar(64) NOT NULL,
    "password" varchar(64) NOT NULL,
    "create_at" timestamp DEFAULT now(),
    PRIMARY KEY ("userid")
);

