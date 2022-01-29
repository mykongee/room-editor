const Scene = require('../models/scene.js');
const Screenshot = require('../models/screenshot.js');

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
        console.log(req.body);
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

scenesController.getImage = async (req, res, next) => {
    // const { sceneName } = req.body.sceneName
    try {
        // const doc = await Screenshot.findOne({sceneName: 'scene1'}, {image: 1, _id: 0});
        const doc = await Screenshot.findOne({sceneName: 'scene2'});
        console.log(doc.image);
        // const img = Buffer.from(doc).toString("base64");
        // console.log(img);
        return next();
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

scenesController.uploadImage = async (req, res, next) => {
    try {
        console.log(req.body);
        const img = Buffer.from(req.body.img.split(",")[1], "base64")
        console.log(img);
        const create = await Screenshot.create({image: img, sceneName: req.body.sceneName});
        console.log(create);
        const doc = create;
        return next();
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

module.exports = scenesController;