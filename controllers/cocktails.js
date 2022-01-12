const Cocktail = require('../models/cocktail');

module.exports = {
    index,
    new: newCocktail,
    show,
    create,
    edit,
    update
}

function index(req, res, next) {

    Cocktail.find({}, function(err, cocktailDocuments) {
        res.render('cocktails/index', {
            cocktails: cocktailDocuments,
            title: 'Cocktails',
            pageHeader: 'Cocktails'
        })
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
        console.log(cocktail + '<------- New Cocktail'); //FIXME:
        res.redirect('/cocktails');
    })
}

function show(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        
        res.render('cocktails/show', {
            cocktail: cocktail,
            title: cocktail.name,
            pageHeader: cocktail.name
        });
    });
}

function edit(req, res) {
    console.log(req.params.id + '<--------req.params.id');
    Cocktail.findById(req.params.id, function(err, cocktail) {
        if (!cocktail.creatorId.equals(req.user._id)) return res.redirect('/cocktails');
        res.render('cocktails/edit', {
            cocktail: cocktail,
            title: 'Edit Cocktail',
            pageHeader: `Edit ${cocktail.name}`
        });
    })
}

function update(req, res) {

}