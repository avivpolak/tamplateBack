const User = require("../models/user.js");

exports.listAllUsers = async (req, res) => {
    try {
        console.log("userlist");
        const userList = await User.find({});
        console.log(userList, "userlist");
        res.status(200).json(userList);
    } catch (error) {
        res.status(400).send(error.massage); //mabey not exist
    }
};

//put all your user functions here :
