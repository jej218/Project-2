const Ingredient = require('../models/ingredient');

module.exports = {
    create,
    delete: deleteBottle
}

function create(req, res) {
    Ingredient.findById(req.params.id, function(err, ingredient) {
        req.body.userId = req.user._id;
        ingredient.bottles.push(req.body);
        ingredient.save(function(err) {
            res.redirect(`/ingredients/${ingredient._id}`);
        });
    });
}

function deleteBottle(req, res) {
    Ingredient.findOne({ 'bottles._id': req.params.id }, function(err, ingredient) {
        const bottleSubdoc = ingredient.bottles.id(req.params.id);
        if (!bottleSubdoc.userId.equals(req.user._id)) return res.redirect(`/ingredients/${ingredient._id}`);
        bottleSubdoc.remove();
        ingredient.save(function(err) {
            res.redirect(`/ingredients/${ingredient._id}`);
        });
    });
}