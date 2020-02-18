const {model, Schema} = require("mongoose");

const tvseriesSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    popularity: String,
    tags: [{type: String}]
});

const tvseries = model("Movie", tvseriesSchema);

module.exports = tvseries;