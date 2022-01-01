const express = require('express')
const res = require('express/lib/response')
const app = express() //initialisation of Express object. Contains server and methods.
const books = require('./books.json')

app.use(express.json()) //middleware, parsing!

//REQUEST Books
app.get('/books', (req,res) => {
    res.status(200).json(books) //status 200: successful request
})
//REQUEST Book ID
app.get('/books/:id', (req,res) => {
    const id = parseInt(req.params.id) //convert id (string) into id (integer)
    const book = books.find(book => book.id === id) //find id passed in the URL
    res.status(200).json(books) //status 200: successful request
})

//ADD INFO
app.post('/books', (req,res) => {
    books.push(req.body)
    res.status(200).json(books) //status200:request done, json: return file books
})

//MODIFY INFO
app.put('books/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let book = books.find(book => book.id === id)
    book.title = req.body.title,
    book.author = req.body.author,
    book.year_written = req.body.year_written,
    book.edition = req.body.edition,
    book.price = req.body.price,
    res.status(200).json(books)
})

//DELETE INFO
app.delete('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let book = books.find(book => book.id === id)
    books.splice(books.indexOf(book),1) // Remove 1 element starting from book index
    res.status(200).json(books)
})

app.listen(8080, () => {
    console.log(`Server running on port 8080`);
}) 