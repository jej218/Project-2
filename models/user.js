const mongoose = require('mongoose');

// Create your User Model
// must include googleId like in paspport example app
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);