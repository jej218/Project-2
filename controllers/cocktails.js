const Cocktail = require('../models/cocktail');
const Ingredient = require('../models/ingredient');

module.exports = {
    index,
    new: newCocktail,
    show,
    create,
    edit,
    update,
    delete: deleteCocktail
}

function index(req, res, next) {

    Cocktail.find({}, function(err, cocktailDocuments) {
        res.render('cocktails/index', {
            cocktails: cocktailDocuments,
            title: 'Cocktails',
            pageHeader: 'Cocktails'
        });
    })
}

function newCocktail(req, res) {
    res.render('cocktails/new', {
        title: 'New Cocktail',
        pageHeader: 'Add a New Cocktail'
    });
}

function create(req, res) {
    req.body.creatorId = req.user._id;
    const cocktail = new Cocktail(req.body);
    cocktail.save(function(err) {
        if (err) return res.render('cocktails/new', {
            title: 'New Cocktail',
            pageHeader: 'Add a new Cocktail'
        });
        res.redirect('/cocktails');
    });
}

function show(req, res) {
    Cocktail.findById(req.params.id).populate('ingredients.ingredient').exec(function(err, cocktail) {
            Ingredient.find({})
                .exec(function(err, ingredientsList) {
                    res.render('cocktails/show', {
                        cocktail: cocktail,
                        title: cocktail.name,
                        pageHeader: cocktail.name,
                        ingredientsList: ingredientsList
                    });
                });
        });
}

function edit(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        if (!cocktail.creatorId.equals(req.user._id)) return res.redirect('/cocktails');
        res.render('cocktails/edit', {
            cocktail: cocktail,
            title: 'Edit Cocktail',
            pageHeader: `Edit ${cocktail.name}`
        });
    });
}

function update(req, res) {
    Cocktail.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, function(err, cocktail){
        res.redirect(`/cocktails/${cocktail._id}`);
    })
}

function deleteCocktail(req, res) {
    Cocktail.findByIdAndRemove(req.params.id, function(err){
        res.redirect('/cocktails');
    });
}