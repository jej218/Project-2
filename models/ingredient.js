const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bottleSchema = new Schema({
    name: String,
    description: String
})

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isLiquid: {
        type: Boolean,
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String
});

module.exports = mongoose.model('Ingredient', ingredientSchema);