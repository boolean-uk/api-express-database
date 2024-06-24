exports.getAllBooks = `
SELECT * 
FROM books`;

exports.getBookById = `
SELECT * 
FROM books 
WHERE id = $1`;

exports.addBook = `
INSERT INTO books 
    (title, type, author, topic, publication_date, pages) 
VALUES 
    ($1, $2,$3, $4, $5, $6)`;

exports.deleteBookById = `
DELETE FROM books 
WHERE id = $1`;

exports.updateBookById = `
UPDATE books 
SET title=$1, 
    type=$2, 
    author=$3, 
    topic=$4, 
    publication_date=$5, 
    pages=$6  
WHERE id = $7`;
