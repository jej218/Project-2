const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: String
}, {
    timestamps: true
});

const cocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        enum: ['Ancestral', 'Beer', 'Bloody', 'Champagne', 'Collins', 'Complex Highball', 'Complex Sour',
            'Dessert', 'Duo', 'Fizz', 'Flip', 'Frozen', 'Highball', 'Hot Drink', 'Julep', 'Milk',
            'Miscellaneous', 'Nog', 'Pousse', 'Shot', 'Simple Highball', 'Simple Sour', 'Sour',
            'Spirit Forward', 'Trio', 'Tropical', 'Wine'
        ]
    },
    glass: {
        type: String,
        enum: ['Collins', 'Coupe', 'Flute', 'Highball', 'Hurricane', 'Julep Tin', 'Margarita', 'Martini',
            'Mug', 'Nick & Nora', 'Old Fashioned', 'Pint', 'Shot', 'Sling', 'Tiki', 'Toddy', 'Wine', 'N/A'
        ]
    },
    directions: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ingredients: 
        [{
                ingredient: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Ingredient'
                },
                quantityName: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number
                }
        }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cocktail', cocktailSchema);