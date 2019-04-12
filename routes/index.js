const express = require('express');
const router  = express.Router();
const Book = require('../models/book')

/* GET home page */
router.get('/', (req, res, next) => {
  Book.find()
    .then(books => {
      // Render "views/index.hbs" and give a variable "books" that is "books" (from then) 
      res.render('index', { books: books })
    })
});

// Example: http://localhost:3000/books/5caf71777412fd8c8759ce80
router.get('/books/:bookId', (req,res,next) => {
  console.log("The id is", req.params.bookId)
  Book.findById(req.params.bookId)
    .then(bookFromDb => {
      res.render('book-detail', {
        book: bookFromDb
      })
    })
})

// Route GET /create-book to display the form to add a book
router.get('/create-book', (req,res,next)=> {
  res.render('create-book') // render "views/create-book.hbs"
})

// Route POST /create-book to receive the form submission
router.post('/create-book', (req,res,next)=> {
  console.log("req.body", req.body)
})



router.get('/surprise', (req, res, next) => {
  next(42)
});

module.exports = router;
