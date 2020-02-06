-- -------------------------------------------------------------
-- TablePlus 3.1.0(290)
--
-- https://tableplus.com/
--
-- Database: posts
-- Generation Time: 2563-02-05 19:13:45.9740
-- -------------------------------------------------------------

CREATE DATABASE posts;

\c posts

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS posts_post_id_seq;

-- Table Definition
CREATE TABLE "public"."posts" (
    "postid" int4 NOT NULL DEFAULT nextval('posts_post_id_seq'::regclass),
    "postby" uuid,
    "title" text,
    "excerpt" text,
    "content" text,
    "post_at" timestamp DEFAULT now(),
    PRIMARY KEY ("postid")
);

