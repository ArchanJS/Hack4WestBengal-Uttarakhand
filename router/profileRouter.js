//profileRouter.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');
const authenticate = require('../middlewares/authenticate');
const {body , validationResult} = require('express-validator');
 
/*
    @usage : Get a Profile
    @url : /api/profiles/me
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
router.get('/me' , authenticate,  async (request , response) => {
    try {
        let profile = await Profile.findOne({user : request.user.id}).populate('user' , ['name' ,'avatar']);
        if(!profile){
            return response.status(400).json({errors : [{msg : 'No Profile Found'}]});
        }
        response.status(200).json({profile : profile});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});
 
/*
    @usage : Create a Profile
    @url : /api/profiles/
    @fields : company , website , location , designation , skills , bio , githubUsername, youtube , facebook , twitter , linkedin , instagram
    @method : POST
    @access : PRIVATE
 */
router.post('/', authenticate , async(request , response) => {
    try {
        let {image, website , location , bio, phone } = request.body;
        const userr= await User.find({_id:request.user.id});
        let profileObj = {};
        profileObj.user = request.user.id; // id gets from Token
        profileObj.businessType=userr[0].businessType;
        console.log(userr);
        if(website) profileObj.website = website; else profileObj.website=""
        if(location) profileObj.location = location; else profileObj.location=""
        if(bio) profileObj.bio = bio; else profileObj.bio=""
        if(phone) profileObj.phone = phone; else profileObj.phone=""
 
 
        // insert to db
        let profile = new Profile(profileObj);
        profile = await profile.save();
        profile.populate('user')
        if(image=='undefined' || image=='' || image==null) image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&usqp=CAU"
 
        await User.findOneAndUpdate({_id: request.user.id},{avatar:image})
        response.status(200).json({
            msg : 'Profile is Created Successfully',
            profile : profile
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});
 
/*
    @usage : Update Profile
    @url : /api/profiles/
    @fields : company , website , location , designation , skills , bio , githubUsername, youtube , facebook , twitter , linkedin , instagram
    @method : PUT
    @access : PRIVATE
 */
router.put('/', authenticate , async(request , response) => {
    try {
        let {image, website , location , bio } = request.body;
 
        // check if profile exists
        let profile = await Profile.findOne({user : request.user.id});
        if(!profile){
            return response.status(401).json({errors : [{msg : 'No Profile Found'}]});
        }
 
        const userr= await User.find({_id:request.user.id});
 
        let profileObj = {};
        profileObj.user = request.user.id; // id gets from Token
        profileObj.businessType=userr[0].businessType;
        if(website) profileObj.website = website; else profileObj.website=""
        if(location) profileObj.location = location; else profileObj.location=""
        if(bio) profileObj.bio = bio; else profileObj.bio=""
 
        // update to db
        profile = await Profile.findOneAndUpdate({user : request.user.id} , {
            $set : profileObj
        } , {new : true})
 
 
        profile.populate('user')
        if(image=='undefined' || image=='' || image==null) image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&usqp=CAU"
        await User.findOneAndUpdate({_id: request.user.id},{avatar:image})
 
        response.status(200).json({
            msg : 'Profile is Updated Successfully',
            profile : profile
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});
 
 
 
/*
    @usage : GET Profile of a user
    @url : /api/profiles/users/:userId
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/users/:userId' , async (request , response) => {
    try {
        let userId = request.params.userId;
        let profile = await Profile.findOne({user : userId}).populate('user' , ['name' , 'avatar']);
        if(!profile){
            return response.status(400).json({errors : [{msg : 'No Profile Found for this user'}]});
        }
        response.status(200).json({profile : profile});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});
 
/*
    @usage : DELETE Profile , userInfo , posts of a user
    @url : /api/profiles/users/:userId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
 */
router.delete('/users/:userId' , authenticate , async (request , response) => {
    try {
        let userId = request.params.userId;
        let profile = await Profile.findOne({user : userId});
        if(!profile){
            return response.status(400).json({errors : [{msg : 'No Profile Found for this user'}]});
        }
        // delete the profile
        profile = await profile.findOneAndRemove({user : userId});
 
        // check if user exists
        let user = await User.findOne({_id : userId});
        if(!user){
            return response.status(400).json({errors : [{msg : 'No User Found'}]});
        }
        await User.findOneAndRemove({_id : userId});
        // TODO delete the post of a user
        response.status(200).json({msg : 'Account is Deleted'});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});
 
/*
    @usage : Get all Profiles
    @url : /api/profiles/all
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/all', async (request , response) => {
    try {
        let profiles = await Profile.find().populate('user' , ['name' , 'avatar']);
        if(!profiles){
            return response.status(400).json({errors : [{msg : 'No Profiles Found'}]})
        }
        response.status(200).json({profiles : profiles});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
})
 
/*
    @usage : Get profile according to business type
    @url : /api/profiles/getusers/:businesstype
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
 
    router.get('/getusers/:businesstype',authenticate,async(request,response)=>{
        try {
            const businessType=request.params.businesstype;
            let users=await Profile.find({businessType}).populate('user',['name', 'avatar']);
            console.log(request.user.id);
            const userr=await Profile.find({user:request.user.id});
            // console.log(userr[0].id);
            users=users.filter(user=>user.id!=userr[0].id);
            // users = await User.populate(user, ['name', 'avatar']);
            response.status(200).send(users);
        } catch (error) {
            console.log(error);
            response.status(500).json({errors : [{msg : error.message}]});
        }
    })
 
/*
    @usage : GET Profile of a user with Profile Id
    @url : /api/profiles/:profileId
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/:profileId' , async (request , response) => {
    try {
        let profileId = request.params.profileId;
        let profile = await Profile.findById(profileId).populate('user' , ['name' , 'avatar']);
        if(!profile){
            return response.status(400).json({errors : [{msg : 'No Profile Found for this user'}]});
        }
        response.status(200).json({profile : profile});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});
 
module.exports = router;