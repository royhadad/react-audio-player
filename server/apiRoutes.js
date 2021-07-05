const songs = require('./songs.json');
const express = require('express')

const router = express.Router();

router.get('/api/songs', (req, res) => {
    return res.send({songs});
});

module.exports = {
    apiRoutes: router
}