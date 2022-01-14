const mongoose = require('mongoose');

const varietySchema = new mongoose.Schema({
    name: String,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    varieties: [varietySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);