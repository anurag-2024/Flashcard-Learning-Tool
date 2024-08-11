import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: "User already exists" });
        }
        if(email==="admin@gmail.com" && password==="admin@123"){
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword,role:"admin" });
            await newUser.save();
            return res.status(201).send({ message: "Admin registered successfully" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "User does not exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send({ message: "Invalid credentials" });
        }
        const token = jwt.sign({id: user._id ,role:user.role}, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).send({message:"Logged In Successfully" , token });
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}