import 'dotenv/config'

import express from "express";
import { validationResult } from 'express-validator';
import mongoose, { Schema } from 'mongoose';

const app = express();

// const PORT = process.env.PORT || 3333;
const {
    PORT = 3333,
    MONGODB_URI = "mongodb://127.0.0.1/c18-homework"
} = process.env;

try {
    const conn = await mongoose.connect(MONGODB_URI);
    // console.log("connected", conn);

    // this is for errors after a connection has been established
    mongoose.connection.on("error", (err) => {
        console.log(err);
    });
} catch (error) {
    // this is for connection error
    console.log(error);
}

// functionality
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse application/json

// connected above
// create a schema (shape of your data)
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 1000
    },
    author: {
        type: String,
        required: true,
        max: 1000
    },
    description: {
        type: String,
        required: true,
        max: 1000
    },
    
    avatar_url: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Open_book_nae_02.svg/1200px-Open_book_nae_02.svg.png",
    },
});
// create a model (obj that has all the methods on it. We use it to query and mutate)
const Book = mongoose.model('Book', bookSchema);

// put model method calls inside route handler

app.get('/api/v1/books/:id?', async (req, res) => {
    let query = {};
    if (req.params.id) {
        query._id = req.params.id;
    }

    // Server-side validation (express-validator)

    try {
        const books = await Book.find(query);
        return res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
    // QUERY to get books
});

app.post("/api/v1/books", async (req, res) => {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookData = req.body;
    console.info(bookData);
    if (bookData.avatar_url === '') {
        delete bookData.avatar_url;
    }
    console.info(bookData);
    try {
        const newBook = new Book(bookData);
        const result = await newBook.save();
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.put('/api/v1/books/:id', async (req, res) => {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const result = await Book.updateOne({ _id: req.params.id }, req.body);
        if (result.n === 0) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.delete('/api/v1/books/:id', async (req, res) => {
    try {
        const result = await Book.deleteOne({ _id: req.params.id });
        if (result.n === 0) return res.sendStatus(404);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})


app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`); //log a message when it is listening
});