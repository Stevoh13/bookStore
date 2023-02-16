const express = require('express');
const {
    getBooks,
    postBook,
    getBookById,
    deleteBookById,
    updateBookById
} = require ("../controllers/books");

const bookRouter = express.Router()

bookRouter.get("/", getBooks);
bookRouter.post("/", postBook);
bookRouter.get("/:id", getBookById);
bookRouter.delete("/:id", deleteBookById);
bookRouter.patch("/:id", updateBookById);

module.exports = bookRouter