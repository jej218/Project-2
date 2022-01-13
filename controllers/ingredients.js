const Cocktail = require('../models/cocktail');
const Ingredient = require('../models/ingredient');

module.exports = {
    index,
    new: newIngredient,
    create,
    show,
    update,
    edit,
    addToCocktail,
    removeFromCocktail
}

function addToCocktail(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        cocktail.ingredients.push(req.body);
        cocktail.save(function (err) {
            res.redirect(`/cocktails/${cocktail._id}`);
        });
    });
}

function removeFromCocktail(req, res) {
    Cocktail.findOne({ 'ingredients._id': req.params.id }, function(err, cocktail) {
        cocktail.ingredients = cocktail.ingredients.filter(i => !(i._id.equals(req.params.id)));
        cocktail.save(function (err) {
            res.redirect(`/cocktails/${cocktail._id}`);
        });
    });
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
    Cocktail.find({'ingredients.ingredient': req.params.id}, function(err, cocktails){
        Ingredient.findById(req.params.id, function(err, ingredient) {
            res.render('ingredients/show', {
                ingredient: ingredient,
                title: ingredient.name,
                pageHeader: ingredient.name,
                cocktails: cocktails
            });
        });
    });
}

function edit(req, res) {
    Ingredient.findById(req.params.id, function(err, ingredient) {
        if (!ingredient.creatorId.equals(req.user._id)) return res.redirect('/ingredients');
        res.render('ingredients/edit', {
            ingredient: ingredient,
            title: 'Edit Ingredient',
            pageHeader: `Edit ${ingredient.name}`
        });
    });
}

function update(req, res) {
    Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, function(err, ingredient){
        res.redirect(`/ingredients/${ingredient._id}`);
    })
}