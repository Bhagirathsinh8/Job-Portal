const mongoose = require('mongoose');
const { models, status } =require('../utils/constant');


const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: models.JOB, required: true },
    applicant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: models.USER,
        require:true,
    },
    status:{
        type:String,
        enum:["pending", "shortlisted", "interview", "hired", "rejected","accepted"],
        default:'pending'
    },
    appliedAt: { type: Date, default: Date.now },
},{timestamps:true});

const Application = mongoose.model(models.APPLICATION,applicationSchema);

module.exports = Application;