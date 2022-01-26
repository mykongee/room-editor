const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.get('/api', cors(), (req, res) => {
    console.log('pinged');
    res.status(200).send(`response from ${PORT}`);
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

module.exports = app;