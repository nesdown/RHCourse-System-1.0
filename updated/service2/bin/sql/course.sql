CREATE TABLE course(
    course_id       SERIAL,
    name            VARCHAR(64) NOT NULL,
    price           INTEGER NOT NULL,
    PRIMARY KEY (course_id)
);

CREATE TABLE course_details(
    details_id      SERIAL,
    course_id       INTEGER NOT NULL,
    students_amount INTEGER NOT NULL,
    partner         VARCHAR(64) NOT NULL,
    location        VARCHAR(64) NOT NULL,
    date            TIMESTAMP NOT NULL,
    PRIMARY KEY(details_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
