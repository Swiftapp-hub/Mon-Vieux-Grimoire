const Book = require('../models/book');

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}

exports.getBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}

// Find 3 books with the best average rating in the books collection using mongoose function
exports.getBestRatedBooks = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}

exports.addBook = (req, res, next) => {
    delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.updateBook = (req, res, next) => {
    delete req.body._id;
    Book.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}

// Add rating to book and recalculate average rating
exports.addRating = (req, res, next) => {
    if (!Book.findOne({ _id: req.params.id }).ratings.some(rating => rating.userId === req.body.userId)) {
        Book.findOneAndUpdate({ _id: req.params.id }, { $push: { ratings: { userId: req.body.userId, grade: req.body.rating } } })
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
    }
}