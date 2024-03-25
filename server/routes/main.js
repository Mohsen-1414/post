const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Routes:

router.get('', async(req, res)=>{
    res.render('index');
})



// a route for opening one specific post 
router.get('/post/:id', (req,res)=>{
    try {
        let slug = req.params.id;
        const data = Post.findById({_id: slug});
        res.render('post', {})
    } catch (error) {
        
    }
})




router.get('/about', (req,res)=> {
    res.render('about');
});
router.get('/contact', (req,res)=> {
    res.render('contact');
});

module.exports = router;



// router.get('', async (req,res)=> {
//     try{ 
//         const data = await Post.query.findAll()
//         res.render('index', {data});
//     } catch(err){
//         console.log(err);
//     }

// });