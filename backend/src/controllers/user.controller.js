import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

// Login function
const login = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please enter all fields"});
    }
    try {
      const user = await User.findOne({ username });
      if(!user) {
          return res.status(httpStatus.NOT_FOUND).json({ message: "User not found"});
      }

      if(await bcrypt.compare(password, user.password)) {
        let token = crypto.randomBytes(20).toString('hex');
        user.token = token;
        await user.save();
        return res.status(httpStatus.OK).json({ message: "Login successful", token: token});
      }
    } catch(e){
       return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${e}`});
    }
}


// Register function
const register = async (req, res) => {
    const { name, username, password } = req.body;

    try{
      const existingUser = await User.findOne({ username });
      if(existingUser) {
        return res.status(httpStatus.FOUND).json({ message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name: name,
        username: username,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User created successfully"});

    } catch(e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${e}`});
    }
};

// Get users History Function
const getUserHistory = async (req, res) => {
    const {token} = req.query;
    try {
        const user = await User.findOne({token: token});
        const meetings = await Meeting.find({user_id: user.username})
        res.json(meetings)    
    } catch(e){
        res.json({ message: `Something went wrong ${e}`})
    }
}

// Add to history function
const addToHitory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

export { login, register, getUserHistory, addToHitory };