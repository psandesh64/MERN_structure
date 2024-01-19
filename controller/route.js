const router = require('express').Router()
const Blog = require('../models/blog')
router.get('/api/blogs', async (req, res,next) => {
    try{
    const blogs = await Blog.find({});
    res.json(blogs);}
    catch(error){
        next(error)
    }
  });
  
router.post('/api/blogs', async (request, response) => {
const { author, title, url, upvotes } = request.body;
const blog = new Blog({ author, title, url, upvotes });
const savedBlog = await blog.save();
response.json(savedBlog);
});

module.exports = router