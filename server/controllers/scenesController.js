const Scene = require('../models/scene.js');

const scenesController = {};

scenesController.getScene = async (req, res, next) => {
    try {
        const doc = await Scene.findOne({name: 'scene1'})
        console.log(Object.keys(doc));
        res.locals.doc = doc;
        return next();
    } catch (err) {
        return next(err);
    }
}

scenesController.uploadScene = async (req, res, next) => {
    try {
        const create = Scene.create({...req.body, name: 'scene1'});
        console.log(create);
        const doc = create;
        console.log(doc);
        return next();
    } catch (err) {
        console.log(err);
        return next(err);
    }

}

module.exports = scenesController;