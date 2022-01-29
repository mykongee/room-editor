const express = require('express');
const router = express.Router();
const scenesController = require('../controllers/scenesController.js')

router.get('/', scenesController.getScene, (req, res) => {
    console.log('pinged');
    console.log(res.locals);
    console.log('after res.locals');
    res.status(200).send(res.locals.doc);
});

router.post('/', scenesController.uploadScene, (req, res) => {
    console.log('posted to /api');
    res.status(200).send('post received');
});

router.get('/img', scenesController.getImage, (req, res) => {
    console.log('sending back image data');
    res.status(200).send('sending back image data');
})

router.post('/img', scenesController.uploadImage, (req, res) => {
    console.log('uploading img via /api/img')
    res.status(200).send('/img post received');
});

module.exports = router;