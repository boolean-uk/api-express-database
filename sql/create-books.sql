DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS books (
  id                SERIAL         PRIMARY KEY,
  title             VARCHAR(255)   NOT NULL,
  type              VARCHAR(255)   NOT NULL,
  author            VARCHAR(255)   NOT NULL,
  topic             VARCHAR(255)   NOT NULL,
  publication_date  VARCHAR(255)   NOT NULL, -- *
  pages             INTEGER        NOT NULL
);

--* Using DATE data type constraint makes a problem with the test as the data returned from the database base is different from the data sent, so that I always get this error message:

       -- Expected: "2020-11-17T00:00:00.000Z"
       -- Received: "2020-11-16T23:00:00.000Z"

-- I don't know why. But I thibk that there is a special processing for the DATE type from DBMS. The only way to solve this problem was to change the data type from DATE to VARCHAR.

