const express = require('express');
const router = express.Router();
const scenesController = require('../controllers/scenesController.js')

router.get('/', scenesController.getScene, (req, res) => {
    console.log('pinged');
    console.log(res.locals);
    console.log('after res.locals');
    res.status(200).send(res.locals.doc);
}) 

router.post('/', scenesController.uploadScene, (req, res) => {
    console.log('posted to /api');
    console.log('req.body: ', req.body);
    res.status(200).send('post received');
})

module.exports = router;