CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET timezone = 'Europe/Berlin';

CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT uuid_generate_v4 (),
  email varchar(254) NOT NULL,
  phone varchar(25) NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  CONSTRAINT email_phone_unique_constraint UNIQUE (email,phone)
);

CREATE TABLE IF NOT EXISTS interests (
  id uuid DEFAULT uuid_generate_v4 (),
  lead_id uuid NOT NULL,
  message varchar(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);
