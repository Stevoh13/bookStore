const express = require('express');
const {
    getUsers,
    postUser,
    getUserById,
    deleteUserById,
    updateUserById,
} = require ("../controllers/users");

const userRouter = express.Router()

userRouter.get("/", getUsers);
userRouter.post("/", postUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.patch("/:id", updateUserById);

module.exports = userRouter