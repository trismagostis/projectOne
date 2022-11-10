const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/project-one',  {useNewUrlParser: true, useUnifiedTopology: true});


const schema = new mongoose.Schema({
    firstName: String,
    surName:  String,
    course: String,
    localization:String,
});


module.exports = mongoose.model('Course', schema);