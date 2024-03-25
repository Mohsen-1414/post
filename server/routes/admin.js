const express = require('express');
const router = express.Router();
const adminLayout = '../views/layout/admin.ejs'
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {mailTransporter, mailDetails} = require('../middlewares/mail');
//const authMiddleware = require('../middlewares/middleware');

const jwtSecret = process.env.JWT_SECRET;



// Going to the main page as in admin page 
router.get('/admin', async(req, res)=>{
    try {
        res.render('./admin/index', {layout: adminLayout});
    } catch (error) {
        console.log(error);
        throw(error);
    }
})


 // Admin - check login 
 router.post('/admin', async(req,res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne( { where: { username: username } });
        if(!user){
            return res.status(401).json({message: 'Not correct credentials'});
        } 

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Not correct credentials haha'});
        }

        const token = jwt.sign({userId: user._id}, jwtSecret, {expiresIn: '10m'});
        //res.cookie('token', token, {httpOnly:true});

        const refreshToken = jwt.sign({userId: user._id}, REFRESH_JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // sendinf email to the person who logs in 
        try {
            mailTransporter.sendMail(mailDetails)
        } catch (error) {
            console.log('Error Occurs');
            throw(error);
        }
        //res.redirect('/dashboard');
        return res.json({toekn})

    } catch (error) {
        console.log(error);
        throw(error);
    }
});


// Refresh Tokens !
app.post('/refresh', (req, res) => {
    if (req.cookies?.jwt) {
 
        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.jwt;
 
        // Verifying refresh token
        jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET,
            (err, decoded) => {
                if (err) {
 
                    // Wrong Refesh Token
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    // Correct token we send a new access token
                    const accessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '10m'});
                    return res.json({ accessToken });
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
})



// creating dashboard route

router.get('/dashboard',  async (req, res)=>{
    try {
        //const data = await Post.find();
        res.render('./admin/dashboard', {layout: adminLayout} );
    } catch (error) {
        console.log(error);
        throw(error);
    }
});

// routing to go to the page for adding a new post
router.get('/add-post', async (req, res)=>{
    try {
        // const data = await Post.find();
        res.render('./admin/add-post' );
    } catch (error) {
        console.log(error);
        throw(error);
    }
});


// routing for adding a new post 
router.post('/add-post', async (req, res)=>{
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });
            await Post.create(newPost);
            res.redirect('./dashboard');
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error);
        throw(error);
    }
});




// Admin - Register
router.post('/register',  async(req,res)=>{
    console.log('test')
    try {
        const {username, password}= req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = User.create({username, password:hashedPassword});
            res.status(201).json({message: 'user created ', user});
        } catch (error) {
            throw(error);
        }
    } catch (error) {
        console.log(error);
        throw(error);
    }
});



module.exports = router;