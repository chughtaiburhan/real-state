import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) =>{
    const { username, email, password } = req.body;
    console.log(req.body); // Check the form data
    if (!password) {
        return res.status(400).json({ message: "Password is required!" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User ({username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        next(error); // Typo fixed here
    }   
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            console.error("User not found:", email); // Log user not found
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            console.error("Invalid credentials for:", email); // Log invalid credentials
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        console.error("Signin error:", error); // Log any error that occurs
        next(error);
    }
};


export const google=async(req,res, next)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=user._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

        }else{
            const generatedPassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) ;
            const hashedPassword =  bcryptjs.hashSync(generatedPassword, 10);
            const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4) ,email:req.body.email,password:hashedPassword,avatar:req.body.photo});
            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=newUser._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}