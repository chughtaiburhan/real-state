import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req,res) => {
    res.json({
        message:'Api router is working',
    });
};

export const updateUser=async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only update your own account !"));

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                avatar:req.body.avatar,
            }
        }, {new:true});
        const { password, ...rest } = updatedUser._doc;
        
        res.status(200).json({
            success: true,
            ...rest
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Delete user function with correct cookie clearing
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account!"));
    }

    try {
        // Delete user by id
        await User.findByIdAndDelete(req.params.id);

        // Clear the cookie before sending the response
        res.clearCookie('access_token');

        // Send the final response
        res.status(200).json({
            success: true,
            message: 'User has been deleted!',
        });
    } catch (error) {
        next(error); // Pass error to middleware
    }
};