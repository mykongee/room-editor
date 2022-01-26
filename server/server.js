const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/api', (req, res) => {
    console.log('pinged');
    res.status(200).send(`response from ${PORT}`);
})

app.post('/api', (req, res) => {
    console.log('posted to /api');
    console.log('req.body: ', req.body);
    res.status(200).send('post received');
})


// app.use()


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

module.exports = app;