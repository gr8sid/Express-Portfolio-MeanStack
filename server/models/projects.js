let mongoose = require('mongoose');

// create a model class
let projectSchema = mongoose.Schema({
    name: String,
    description: String
},
{
    collection: "projects"
});

module.exports = mongoose.model('sidharth', projectSchema);