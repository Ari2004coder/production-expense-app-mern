const UserModel = require('../models/userModal')

//login callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email, password })
        if (!user) {
            return res.status(404).send("user not found")
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
}
//register callback
const registerController = async (req, res) => {
try {
    const newuser=await UserModel.create(req.body)
    res.status(201).json({
       success:true,
        data:newuser
    })
    
} catch (error) {
     res.status(400).json({
            success: false,
            message: error
        })
}
}

// update user
const updateUserController = async (req, res) => {
    try {
        const { userId, name } = req.body;
        const user = await UserModel.findByIdAndUpdate(userId, { name }, { new: true }); // {new: true} returns the updated document
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user", error });
    }
};

module.exports = { loginController, registerController, updateUserController }