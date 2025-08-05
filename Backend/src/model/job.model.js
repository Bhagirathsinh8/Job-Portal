const mongoose = require('mongoose');
const { models } =require('../utils/constant');

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    requirement:{
        type:String,
        require:true
    },
    salary:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    jobType:{
        type:String,
        require:true
    },
    position:{
        type:Number,
        require:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref: models.COMPANY,
        // require:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref: models.USER,
        // require:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: models.APPLICATION,
    }]
},{timestamps:true});

const Job = mongoose.model(models.JOB, jobSchema);

module.exports = Job;