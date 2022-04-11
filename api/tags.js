const express = require('express');
const tagRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagRouter.use((req, res, next) => {
    console.log("this is a request from tags");
    next();
})

tagRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({tags})
})

tagRouter.get('/:tagName/posts',async(req,res,next) => {
    const {tagName} = req.params;
    try {
        const postsByTagName = await getPostsByTagName(tagName);
        const posts = postsByTagName.filter(post => {
            return post.author.active || post.active || (req.user && post.author.id === req.user.id);
          });
    res.send({
        posts
    });
} catch ({name,message}) {
    next({ name, message });
    }
})

module.exports = tagRouter;