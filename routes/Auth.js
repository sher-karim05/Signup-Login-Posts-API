const router = require('express').Router();

const User = require('../model/authSchema');

const bcrypt = require('bcryptjs');

//Register end point
// router.post('/reg', async(req, res)=> {
//     res.send('Hello')
// })

router.post('/register', async(req, res) => {
    //conform email
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const savedPost = await new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        
        const resultPost = await savedPost.save()
        
        res.status(200).json(resultPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Login endpoint
router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne(
            {
                username : req.body.username
            });
            !user && res.status(400).json('Wrong Password!');

            const {password, ...others} = user._doc;
            
            res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;