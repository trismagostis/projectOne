const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/project-one',  {useNewUrlParser: true, useUnifiedTopology: true});


const schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    surName: {type: String, required: true},
    course: {type: String, required: true},
    localization:{type: String, required: true}
});


module.exports = mongoose.model('Course', schema);