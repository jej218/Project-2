const Ingredient = require('../models/ingredient');

module.exports = {
    create,
    delete: deleteVariety
}

// Create a new variety document for the ingredient document
// Run from the Ingredient Show Page - Any user can create a variety
function create(req, res) {
    // Find the Ingredient document (document that is showing currently)
    Ingredient.findById(req.params.id, function(err, ingredient) {
        // Add the active user's Id to req.body, so that the bottles userId key
        // has the value of the active user's _id
        req.body.userId = req.user._id;
        // Pushes the new bottle information to the ingredient's list of varieties
        ingredient.varieties.push(req.body);
        // saves ingredient and redirects to its show page (this is the same )
        ingredient.save(function(err) {
            res.redirect(`/ingredients/${ingredient._id}`);
        });
    });
}

// Delete a variety document from the database
// Run from the ingredient show page - only the user that created the variety can delete it
function deleteVariety(req, res) {
    // Find the Ingredient document (page that is showing)
    // This is done by finding the one that has a variety with an _id equal to the req.params.id
    Ingredient.findOne({ 'varieties._id': req.params.id }, function(err, ingredient) {
        // declares varieties subdoc as the variety that is being deleted
        const varietySubdoc = ingredient.variety.id(req.params.id);
        // Redirects back to the ingredient's show page if the variety being deleted
        // was not created by the active user
        if (!varietySubdoc.userId.equals(req.user._id)) return res.redirect(`/ingredients/${ingredient._id}`);
        // removes the variety, save's its ingredient and redirects back to the 
        // ingredient's show page
        varietySubdoc.remove();
        ingredient.save(function(err) {
            res.redirect(`/ingredients/${ingredient._id}`);
        });
    });
}