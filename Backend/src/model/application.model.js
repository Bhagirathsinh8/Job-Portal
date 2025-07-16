const mongoose = require('mongoose');
const { models, status } =require('../utils/constant');


const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:models.APPLICATION,
        require:true,
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: models.USER,
        require:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});

const Application = mongoose.model(models.APPLICATION,applicationSchema);

module.exports = Application;