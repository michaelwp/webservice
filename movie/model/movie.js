const {model, Schema} = require("mongoose");

const movieSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    popularity: String,
    tags: [{type: String}]
});

const movie = model("Movie", movieSchema);

module.exports = movie;