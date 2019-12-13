CREATE TABLE course(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(64) NOT NULL,
    students_amount INTEGER NOT NULL,
    partner         VARCHAR(64) NOT NULL,
    location        VARCHAR(64) NOT NULL,
    date            TIMESTAMP NOT NULL,
    price           INTEGER NOT NULL
);