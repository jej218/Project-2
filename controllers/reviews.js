const Cocktail = require('../models/cocktail');

module.exports = {
    create,
    delete: deleteReview,
    update
}

function create(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;
        cocktail.reviews.push(req.body);
        cocktail.save(function(err) {
            res.redirect(`/cocktails/${cocktail._id}`);
        });
    });
}

function deleteReview(req, res) {
    Cocktail.findOne({ 'reviews._id': req.params.id }, function(err, cocktail) {
        const reviewSubdoc = cocktail.reviews.id(req.params.id);
        if (!reviewSubdoc.userId.equals(req.user._id)) return res.redirect(`/cocktails/${cocktail._id}`);
        reviewSubdoc.remove();
        cocktail.save(function(err) {
            console.log('Delete Error');
            res.redirect(`/cocktails/${cocktail._id}`);
        });
    });
}

function update(req, res) {
    Cocktail.findOne({ 'reviews._id': req.params.id }, function(err, cocktail) {
        const reviewSubdoc = cocktail.reviews.id(req.params.id);
        if (!reviewSubdoc.userId.equals(req.user._id)) return res.redirect(`/cocktails/${cocktail._id}`);
        reviewSubdoc.text = req.body.text;
        reviewSubdoc.rating = req.body.rating;
        cocktail.save(function(err) {
            res.redirect(`/cocktails/${cocktail._id}`);
        });
    })
}