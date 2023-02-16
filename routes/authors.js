const express = require('express');

const {
    getAuthors,
    postAuthor,
    getAuthorById,
    deleteAuthorById,
    updateAuthorById
} = require ("../controllers/authors");

const authorRouter = express.Router()           //authors router

authorRouter.get("/", getAuthors);
authorRouter.post("/", postAuthor);
authorRouter.get("/:id", getAuthorById);
authorRouter.delete("/:id", deleteAuthorById);
authorRouter.patch("/:id", updateAuthorById);

module.exports = authorRouter
