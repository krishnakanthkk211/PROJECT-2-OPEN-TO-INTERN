const mongoose = require('mongoose')
const InternModel = require("../models/internModel");
const CollegeModel = require("../models/collegeModel")
const {isValidemail,isValidmobile}= require('../validator/validator')

const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).length > 0) { return true }
}

const createInterns = async function (req, res) {
    try {
        let data = req.body
        const { name, email, mobile, collegeId } = data;
        //validations 
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "NO data provided" })

        if (!isValid(name)) { return res.status(400).send({ status: false, msg: "Name is required or it should be valid" }) }

        if (!isValidemail(email)) { return res.status(400).send({ status: false, msg: "Email is required or it should be valid" }) }

        if (!email) { return res.status(400).send({ status: false, msg: "Email id is required" }) }

        let duplicateEmail= await InternModel.findOne({email:email})
        if(duplicateEmail){ return res.status(400).send({status: false, msg: "Email already exist"})}

        if (!mobile) { return res.status(400).send({ status: false, msg: "Mobile is required" }) }

        if (!isValidmobile(mobile)) { return res.status(400).send({ status: false, msg: "Please enter a valid mobile number" }) }

        let duplicateMobile= await InternModel.findOne({mobile:mobile})
        if(duplicateMobile){ return res.status(400).send({status: false, msg: "Mobile number already exist"})}
    
        const isMatch= await CollegeModel.findById(collegeId)
        if(!isMatch){return res.status(400).send({status:false, msg:"please enter a valid college id"})}



        const newIntern = await InternModel.create(data);
        return res.status(201).send({ status: true, msg: newIntern })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }

}



module.exports.createInterns = createInterns;