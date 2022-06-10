const router = require('express').Router();
const Post = require('../model/post');

//Create post
router.post('/', async(req, res, next) => {
    try {
        const savePost = await new Post(req.body);
        const savedPost = await savePost.save();
        res.status(200).json(savedPost);
        next();
    }catch(error){
        res.status(500).json(error)
    }
})

//Update post;
router.put('/:id', async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await Post.updateOne({$set: req.body})
            res.status(200).json('Post has been Updated!')
        } else {
            res.status(403).json('You can not update your post!')
        }
        next()
    } catch (error) {
        res.status(500).json({message: error})
    }
})

//delete post

router.delete('/:id', async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await Post.deleteOne()

            res.status(200).json('Post has been deleted');
        } else{
            res.status(403).json({message: "You can not delete your post"})
        }
        next()
    } catch (error) {
        res.status(500).json({message: 'Cannot delete post', error});
    }
})

//Get all post 
router.get('/', async(req,res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json("Cannot get posts", error)
    }
})

//Get one post 
router.get('/:id', async(req, res) => {
    try {
        const post = await findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;