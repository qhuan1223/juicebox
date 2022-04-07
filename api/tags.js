const express = require('express');
const tagRouter = express.Router();
const { getAllTags } = require('../db');

tagRouter.use((req, res, next) => {
    console.log("this is a request from tags");
    next();
})

tagRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    })
})

module.exports = tagRouter;