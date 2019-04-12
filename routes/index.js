const express = require('express');
const router  = express.Router();
const Book = require('../models/book')

/* GET home page */
router.get('/', (req, res, next) => {
  Book.find()
    .then(books => {
      // Render "views/index.hbs" and give a variable "books" that is "books" (from then) 
      res.render('index', { 
        books: books,
        message: req.query.msg
      })
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
  // Because the info was sent with a post form, we can access data with `req.body`
  console.log("req.body", req.body)
  Book.create({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  })
  .then(createdBook => {
    console.log("The book was created, you are going to be redirected")
    res.redirect('/books/'+createdBook._id)
  })
})

// http://localhost:3000/books/5cb094036aaa14adaf3ec765/delete
router.get('/books/:bookId/delete', (req,res,next)=> {
  // Delete the book and redirect the user to the home page when it's done
  // Book.deleteOne({ _id: req.params.bookId }) // Solution 1
  Book.findByIdAndDelete(req.params.bookId) // Solution 2
    .then(deletedBook => {
      // Redirect to the home page with a `req.query.msg`
      res.redirect(`/?msg=The book "${deletedBook.title}" has been deleted`)
    })
})

// Route "GET /books/:bookId/edit" to display the edit form
router.get('/books/:bookId/edit', (req,res,next)=> {
  Book.findById(req.params.bookId)
    .then(bookFromDb => {
      res.render('edit-book', {
        book: bookFromDb
      })
    })
})

// Route "POST /books/:bookId/edit" to receive the form submission
router.post('/books/:bookId/edit', (req,res,next)=> {
  Book.findByIdAndUpdate(req.params.bookId, {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  })
    .then(() => {
      // Redirect to the detail page of the book
      res.redirect('/books/'+req.params.bookId)
    })
})

module.exports = router;
