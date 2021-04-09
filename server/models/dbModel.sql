CREATE DATABASE chat_app;

-- to use uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
CREATE TABLE account(
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE chat(
    chat_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE messages(
    message_id SERIAL PRIMARY KEY,

    user_id UUID,
    FOREIGN KEY (user_id)
    REFERENCES account (user_id),

    chat_id SERIAL,
    FOREIGN KEY (chat_id)
    REFERENCES chat (chat_id),

	name VARCHAR(255),

    messageBody VARCHAR(255),

    dateSent VARCHAR(255)
);

