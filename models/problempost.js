const { boolean } = require("joi")
const mongoose=require("mongoose")
const Schema=mongoose.Schema

const ProblemPostSchema=new Schema({
    title:String,
    image:String,
    description:String,
    seviyarity:String,
    cve:String,
    patch:String,
    solution:String


})
module.exports=mongoose.model('ProblemPost',ProblemPostSchema)
