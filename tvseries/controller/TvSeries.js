const tvseriesModel = require('../model/tvseries');

class TvSeries {
    static create = (req, res, next) => {
        tvseriesModel.create({
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
        tvseriesModel.find()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    };

    static update = (req, res, next) => {
        tvseriesModel.findByIdAndUpdate(
            req.params.id, {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            },{
                new: true
            }).then(response => {
            res.status(200).json(response)
        }).catch(next)
    };

    static delete = (req, res, next) => {
        tvseriesModel.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    };
}

module.exports = TvSeries;