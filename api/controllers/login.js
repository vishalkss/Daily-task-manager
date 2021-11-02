const Users = require("../models/login");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

const login = async (req,res) =>{

    console.log("req.body", req.body);

    const login = await Users.find({ 'email': req.body.email});

    if (login.length===0){
        res.status(401).send({ auth: false, token: "", user: login, message:"User not found. Please SignUp to continue" });
    } else {
        let passwordIsValid = bcrypt.compareSync(req.body.password, login[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: login[0]._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: login, message: "User logged in Successfully" });
    }

}

const registerUser = async (req, res) => {

    const userExists = await Users.find({ 'email': req.body.email });

    if (userExists) {
        res.status(401).send({ message: "User already exists. Please login", user: [] });
    } else {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        },
            function (err, user) {
                if (err) return res.status(500).send("There was a problem registering the user.")
                // // create a token
                // var token = jwt.sign({ id: user._id }, config.secret, {
                //     expiresIn: 86400 // expires in 24 hours
                // });
                res.status(200).send({ message: "Sign Up Successfull. Please login", user: user });
            }); 
        }
}




const updateMeeting = async (req, res) => {

    const { id: meetingID } = req.params;

    if (req.body.start_time < "09:00" || req.body.start_time > "18:00" || req.body.end_time < "09:00" || req.body.end_time > "18:00") {
        res.status(401).send("meeting can only be scheduled between 09:00 and 18:00");
    }
    const meeting = await Users.findOneAndUpdate({
        '_id': meetingID
    },req.body);
    if (!meeting) {
        res.status(401).send("No Meeting exist");
    } else {
        res.status(200).json({ meeting })
    }

}


const cancelMeeting = async (req, res) => {

    const { id: meetingID } = req.params;
    const meeting = await Users.findOne({
        '_id': meetingID
    });

    if (meeting){
        let currentDate = new Date();
        let cDay = currentDate.getDate()
        let cMonth = currentDate.getMonth() + 1
        let cYear = currentDate.getFullYear()
        let todayDate = cDay + "/" + cMonth + "/" + cYear;
        let time = currentDate.getHours() + ":" + currentDate.getMinutes();

        if (todayDate == Users.date) {
            if (time > Users.start_time) {
                res.status(401).send("Ccouldn't Cancel meetings if the meeting has already started");
            }
        } else {
            const meetingDelete = await Users.findOneAndDelete({ '_id': meetingID });
            if (!meetingDelete) {
                res.status(401).send("No Meeting exist");
            } else {
                res.status(200).send(" Meeting deleted successfully");
            }
        }
    } else {
        res.status(401).send("No Meeting exist");
    }


}


module.exports = { login, registerUser, updateMeeting, cancelMeeting};