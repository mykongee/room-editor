const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const apiRouter = require('./routes/api.js');

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', apiRouter);

app.use((req, res) => res.status(404).send('404 Error'));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

module.exports = app;