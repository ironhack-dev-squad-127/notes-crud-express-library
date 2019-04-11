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

// http://localhost:3000/books/5caf71777412fd8c8759ce80
router.get('/books/:bookId', (req,res,next) => {
  console.log("The id is", req.params.bookId)
  Book.findById(req.params.bookId)
    .then(bookFromDb => {
      res.render('book-detail', {
        book: bookFromDb
      })
    })
})

router.get('/surprise', (req, res, next) => {
  next(42)
});

module.exports = router;
