const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
                status: 'success',
                result: posts.length,
                data: posts
        });
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error: error.message
        });
        
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: post
        });
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error: error.message
        });     
    }
}

exports.createOnePost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({
            status: 'success',
            data: post
        });
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error: error.message
        });     
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!post){
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: post
        });
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error: error.message
        });     
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post){
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: post
        });
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error: error.message
        });     
    }
}

