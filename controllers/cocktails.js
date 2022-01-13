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

// Renders Cocktail index page, showing all the cocktail documents
// Link provided from site-wide navbar
function index(req, res, next) {
    Cocktail.find({}, function (err, cocktailDocuments) {
        res.render('cocktails/index', {
            cocktails: cocktailDocuments,
            title: 'Cocktails',
            pageHeader: 'Cocktails'
        });
    })
}

// Renders the New Cocktail page - link provided from site-wide navbar
// available only to users
function newCocktail(req, res) {
    res.render('cocktails/new', {
        title: 'New Cocktail',
        pageHeader: 'Add a New Cocktail'
    });
}

// Creates a cocktail from the New Cocktail Page - form submission from
// new cocktail page
function create(req, res) {
    // Adds active user's _id to the new cocktails creatorId key
    req.body.creatorId = req.user._id;
    // Creates the new coctail from the information from the new cocktail form
    const cocktail = new Cocktail(req.body);
    // saves the new cocktail
    cocktail.save(function (err) {
        // re-renders the new cocktail page if there is an error
        if (err) return res.render('cocktails/new', {
            title: 'New Cocktail',
            pageHeader: 'Add a new Cocktail'
        });
        // redirects to the cocktail index page otherwise
        res.redirect('/cocktails');
    });
}

// Renders the show page for a particular cocktail - link from cocktails index page,
// ingredients show page, as well as redirected from several other controller functions
function show(req, res) {
    // find the cocktail to show - populate ingredients.ingredient 
    // ingredients is a key, type is array of objects - 
    // ingredient is a key of the object with in the ingredient array,
    // type is an ObjectId that points to an ingredient document
    Cocktail.findById(req.params.id).populate('ingredients.ingredient').exec(function (err, cocktail) {
        // find all the ingredients to pass to res.render as ingredientsList
        // this is the list of ingredients to show in the add ingredients menu
        Ingredient.find({}).exec(function (err, ingredientsList) {
            // render cocktails show page
            res.render('cocktails/show', {
                cocktail: cocktail,
                title: cocktail.name,
                pageHeader: cocktail.name,
                ingredientsList: ingredientsList
            });
        });
    });
}

// Renders the Edit page for a cocktail - accessed from the cocktail's show page
// Only allowed for user that created the cocktail
function edit(req, res) {
    // find the cocktail to edit
    Cocktail.findById(req.params.id, function (err, cocktail) {
        // if the active user did not create this cocktail, redirect back to the cocktails show page
        if (!cocktail.creatorId.equals(req.user._id)) return res.redirect(`/cocktails/${cocktail._id}`);
        res.render('cocktails/edit', {
            cocktail: cocktail,
            title: 'Edit Cocktail',
            pageHeader: `Edit ${cocktail.name}`
        });
    });
}

function update(req, res) {
    Cocktail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function (err, cocktail) {
        res.redirect(`/cocktails/${cocktail._id}`);
    })
}

function deleteCocktail(req, res) {
    Cocktail.findByIdAndRemove(req.params.id, function (err) {
        res.redirect('/cocktails');
    });
}