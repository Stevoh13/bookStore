const authorModel = require('../models/authors');

//GET.................................................................................
const getAuthors  = (req,res)  => { 
    authorModel.find()                //using the the 'BookModel' to find all books

    .then(authors  => {               //if query is successful, return JSON array of the books
        res.json(authors)
    })
    .catch(err  => {                //if an error occurs, log the error msg. and send the error to the client
        console.log(err)
        res.send(err)
    })
}
//POST.....................................................................................
//post authors
const postAuthor = (req,res) => {
    const author = req.body           //extract the book object from the request body
    author.lastUpdateAt = new Date()  //set the lastUpdateAt property of the book to the current date
    authorModel.create(author)          //create a new book in the database using the bookModel

    .then(author => {
        res.status(201).json(author)  //if the book is successfully created, return a 201 status code.
    })
    .catch(err => {
        console.log(err)            //if there is error, log it to the console and return a 500 status code.
        res.status(500).json(err)
    })
}

//GET AUTHORs by IDs..............................................................................
const getAuthorById = (req,res)  => {
    const id = req.params.id        //get the Id from the URL parameters
    authorModel.findById(id)          //use the bookModel to find a book by its Id
    .then(author  => {
        res.status(200).json(author)
    })
    .catch(err => {                 //if there's error, log it and return an error msg.
        console.log(err)
        res.status(404).send(err)
    })
}

//DELETE by IDs.................................................................................
const deleteAuthorById = (req,res)  => {
    const id = req.params.id                //get the id of the book to delete from the request parameters
    authorModel.findByIdAndRemove(id)         //use the findByIdAndRemove method on the bookModel to delete the book.
    .then(author => {
        res.status(200).json("Author deleted successfully!")      //if the book is deleted successfully,send the deleted book back to the client.
    })
    .catch(err => {
        console.log(err)                    //if there is an error, log it an send a 500 Internal Servsr Error.
        res.status(500).json(err)
    })
}

//UPDATE by IDs..................................................................................
const updateAuthorById = (req,res) => {
    const id = req.params.id                //get the id from the URL parameters
    const author = req.body                   //get the updated book data from the request body
    author.lastUpdateAt = new Date()          //set the lastUpdateAt to the current date
    authorModel.findByIdAndUpdate(id, author, {new: true})      //use the Mongoose findByIdAndUpdate method to update the book in the db.
    .then(author =>{
        res.status(200).json("Updated successfully!")       //if the update is successful, return the updated book in the response
    })
    .catch(err =>{
        console.log(err)
        res.send(500).json(err)
    })
}

//Exporting my module
module.exports = {
    getAuthors,
    getAuthorById,
    postAuthor,
    deleteAuthorById,
    updateAuthorById
}