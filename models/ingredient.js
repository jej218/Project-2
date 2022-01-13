const mongoose = require('mongoose');

const bottleSchema = new mongoose.Schema({
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
    isLiquid: {
        type: Boolean,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    bottles: [bottleSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);