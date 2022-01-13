const Ingredient = require('../models/ingredient');

module.exports = {
    create,
    delete: deleteBottle
}

// Create a new bottle document for the ingredient document
// Run from the Ingredient Show Page - Any user can create a bottle
function create(req, res) {
    // Find the Ingredient document (document that is showing currently)
    Ingredient.findById(req.params.id, function(err, ingredient) {
        // Add the active user's Id to req.body, so that the bottles userId key
        // has the value of the active user's _id
        req.body.userId = req.user._id;
        // Pushes the new bottle information to the ingredient's list of bottles
        ingredient.bottles.push(req.body);
        // saves ingredient and redirects to its show page (this is the same )
        ingredient.save(function(err) {
            res.redirect(`/ingredients/${ingredient._id}`);
        });
    });
}

// Delete a bottle document from the database
// Run from the ingredient show page - only the user that created the bottle can delete it
function deleteBottle(req, res) {
    // Find the Ingredient document (page that is showing)
    // This is done by finding the one that has a bottle with an _id equal to the req.params.id
    Ingredient.findOne({ 'bottles._id': req.params.id }, function(err, ingredient) {
        // declares bottles subdoc as the bottle that is being deleted
        const bottleSubdoc = ingredient.bottles.id(req.params.id);
        // Redirects back to the ingredient's show page if the bottle being deleted
        // was not created by the active user
        if (!bottleSubdoc.userId.equals(req.user._id)) return res.redirect(`/ingredients/${ingredient._id}`);
        // removes the bottle, save's its ingredient and redirects back to the 
        // ingredient's show page
        bottleSubdoc.remove();
        ingredient.save(function(err) {
            res.redirect(`/ingredients/${ingredient._id}`);
        });
    });
}