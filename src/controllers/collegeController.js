const mongoose = require('mongoose')
const CollegeModels = require('../models/collegeModel')
const InternModels = require('../models/internModel')
const {isValidLogoLink,isValidfullName, isValidname}= require('../validator/validator')
//==================================validator==============================================================//
const isValid =  function(value){
    if(typeof value == "undifined" || value == "null") return false
    if(typeof value == "string" && value.trim().length == 0) return false
}
//===================================createCollege======================================================================//
const createcollege = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0)
            return res.status(400).send("fields are Mandatory to Create")
        let {name, fullName, logoLink} = data
        //if (isValid(name)){return res.status(400).send({ status: false, message: "Enter valid name" })}
        if (!isValidname(name)){return res.status(400).send({ status: false, message: "Name is required" })}
        if (!isValidfullName(fullName)){return res.status(400).send({ status: false, message: "fullname is required" })}
        if (!isValidLogoLink(logoLink)){return res.status(400).send({ status: false, message: "logolink is required" })}

        
        let saveData= await  CollegeModels.create(data);
     return res.status(201).send({msg:saveData})
    }  
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


//==========================================================
const getColleges = async function (req, res) {
    try {
        let collegeName = req.query.name
        if (!collegeName) { return res.status(400).send({status: false, msg:"College name is required"}) }
        let collegeId = await CollegeModels.find({ name: collegeName  }).select({ _id: 1 })
        if (collegeId.length==0) {return res.status(404).send({status:false, msg:"Please enter a valid name abbreviation in lowercase"})}
        let interns = await InternModels.find({ collegeId: collegeId }).select({ name: 1, email: 1, mobile: 1, _id: 1 })
        let result = await CollegeModels.find({ name: collegeName}).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })

        const obj = {
            name: result[0].name,
            fullName: result[0].fullName,
            logoLink: result[0].logoLink,
            interests: interns
        }
        return res.status(200).send({ status: true, data: obj })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.createcollege=createcollege
module.exports.getColleges=getColleges