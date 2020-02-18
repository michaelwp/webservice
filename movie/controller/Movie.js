const movieModel = require('../model/movie');

class Movie {
    static create = (req, res, next) => {
        movieModel.create({
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: req.body.tags
        }).then(response => {
            res.status(201).json(response)
        }).catch(next)
    };

    static read = (req, res, next) => {
        movieModel.find()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    };

    static update = (req, res, next) => {
        movieModel.findByIdAndUpdate(
            req.params.id, {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }, {
                new: true
            }).then(response => {
            res.status(200).json(response)
        }).catch(next)
    };

    static delete = (req, res, next) => {
        movieModel.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    };
}

module.exports = Movie;