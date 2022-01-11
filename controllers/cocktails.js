const Cocktail = require('../models/cocktail');

module.exports = {
    index,
    new: newCocktail,
    show,
    create
}

function index(req, res, next) {
    Cocktail.find({}, function(err, cocktailDocuments) {
        res.render('cocktails/index', {
            cocktails: cocktailDocuments,
        })
    })
}

function newCocktail(req, res) {
    res.render('cocktails/new');
}

function create(req, res) {
    const cocktail = new Cocktail(req.body);
    cocktail.save(function(err) {
        if (err) return res.render('cocktails/new');
        console.log(cocktail + '<------- New Cocktail'); //FIXME:
        res.redirect('/cocktails');
    })
}

function show(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        console.log(req.user + '<-----req.user'); //FIXME:
        res.render('cocktails/show', { cocktail: cocktail });
    });
}