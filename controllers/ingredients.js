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
    removeFromCocktail,
    delete: deleteIngredient
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

async function index(req, res) {
    let temp = [];
    let ingredients = await Ingredient.find({});
    let sum = 0;
    let numReviews = 0;
    let avgRating = [];
    for(const ingredient of ingredients) {
        let count = await Cocktail.countDocuments({'ingredients.ingredient': ingredient._id });
        let cocktails = await Cocktail.find({'ingredients.ingredient': ingredient._id});
        sum = 0;
        numReviews = 0;
        for(const cocktail of cocktails) {
            for(const review of cocktail.reviews) {
                sum += review.rating;
                numReviews++;
            }
        }
        if(numReviews > 0 ){
            avgRating.push(sum/numReviews);
        }
        else{
            avgRating.push(undefined);
        }
        temp.push(count);
    };
    
    res.render('ingredients/index', {
        ingredients: ingredients,
        title: 'Conspicuous',
        pageHeader: 'Ingredients',
        numCocktails: temp,
        ratings: avgRating
    });
}

function show(req, res){
    Cocktail.find({'ingredients.ingredient': req.params.id}, function(err, cocktails){
        Ingredient.findById(req.params.id, function(err, ingredient) {
            let sum = 0;
            let sumTotal = 0;
            let numReviews = 0;
            let averageRating = -1;
            let cocktailAverageRatings = [];
            let overallAverage = -1;
            cocktails.forEach(function(c){
                sum = 0;
                averageRating = -1;
                c.reviews.forEach(function(r) {
                    sum += r.rating;
                    sumTotal += r.rating;
                    numReviews++;
                });
                if(c.reviews.length > 0) averageRating = sum / c.reviews.length;
                cocktailAverageRatings.push(averageRating);
            });
            if(numReviews > 0 ){
                overallAverage = sumTotal/numReviews;
            }
            else{
                overallAverage = undefined;
            }
            console.log(averageRating, '<------------cocktailAverageRatings') //FIXME:
            res.render('ingredients/show', {
                ingredient: ingredient,
                title: ingredient.name,
                pageHeader: ingredient.name,
                cocktails: cocktails,
                cocktailAverageRatings: cocktailAverageRatings,
                overallAverage: overallAverage
            });
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

function deleteIngredient(req, res) {
    Ingredient.findByIdAndRemove(req.params.id, function(err) {
        res.redirect('/ingredients');
    }) 
}