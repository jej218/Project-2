const cocktail = require('../models/cocktail');
const Ingredient = require('../models/ingredient');

module.exports = {
    index,
    new: newIngredient,
    create,
    show
}

function index(req, res, next) {
    Ingredient.find({}, function(err, ingredientDocuments) {
        res.render('ingredients/index', {
            ingredients: ingredientDocuments,
            title: 'Ingredients',
            pageHeader: 'Ingredients'
        });
    });
}

function newIngredient(req, res) {
    res.render('ingredients/new', {
        title: 'New Ingredient',
        pageHeader: 'Add a New Ingredient'
    })
}

function create(req, res){
    req.body.creatorId = req.user._id;
    const ingredient = new Ingredient(req.body);
    ingredient.save(function(err) {
        if (err) {
            return res.render('ingredients/new', {
                title: 'New Ingredient',
                pageHeader: 'Add a New Ingredient'}
            );
        }
        res.redirect('/ingredients');
    });
}

function show(req, res){
    Ingredient.findById(req.params.id, function(err, ingredient) {
        res.render('ingredients/show', {
            ingredient: ingredient,
            title: ingredient.name,
            pageHeader: ingredient.name
        });
    });
}