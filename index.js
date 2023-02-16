       //apps entry point
       const express = require('express');             //import express
        const app = express();                         //initializing express              
        const bodyParser  = require('body-parser');   
        const db  = require('./dataBase/db');

        const users =  require('./models/users')        //initializing users
        const port = 4500;                             //define your port

        db.connectToMongoDB();                         //connect to MongoDB

        const booksRoute = require('./routes/books');           //connecting/importing to the books route
        const authorRouter = require('./routes/authors');       //connecting to the authors route
        const userRouter = require('./routes/users',);           //connecting to the users route

        app.use(express.static('public'));
        app.use(express.json());

        app.get("/home", (req,res) => {              //Homepage in JSON format
            res.status(200).json({message: "Hi there! Welcome to my Bookstore"});
            });

        app.use('/books', authentication,booksRoute);              //using books router
        app.use('/authors', authentication, authorRouter);          //using authors router
        app.use('/users',authentication,userRouter);              //using users router

        const bcrypt = require('bcrypt');                           //importing bcrypt


//SIGN-IN..............................................................................
            app.post('/signin', async (req,res) =>{
                //extract the username and passwordfrom the request body
                const {username, password} = req.body;
                //find the user in the list of users by matching the provided username
                const user = await users.findOne({username})
                    if (!user){
                        return res.status(401).json({
                            message:"Not a user"
                        });
                    }
                    const isPasswordMatch = await bcrypt.compare(password, user.password)

                    if (isPasswordMatch){
                    //if the passwords match create an authentication token
                    const token = Buffer.from(`${username}:${password}`).toString('base64');
                    //return a 200(OK) response with the auth successful msg. and the token
                    return res.status(200).json({
                        message:"Auth successful",
                        token
                    })
                }else {
                    //if the passwords doesn't match, return a 401 Unauthorized response with an error statement
                    return res.status(401).json({
                        message:"Auth failed"
                    })
                }
                })

//MIDDLEWARE............................................................................
async function authentication(req, res, next) {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization.split(' ');

        const authType = authHeader[0]; 
        const authValue = authHeader[1];
                
        if (authType === 'Basic') {        
            const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');
            const user = await users.findOne({username});
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
    //compare passwords
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (isPasswordMatch) {     
                req.user = user.username;              
                next();                                 
            } else { 
                return res.status(401).json({     
                    message: 'Username or Password is incorrect'
                });
            }
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Auth header not present'
        });
    }
}


app.listen(port, () => {
    console.log(`bookStore is running on http://localhost:${port}`)
});
