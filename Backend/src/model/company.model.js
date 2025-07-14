const mongoose = require('mongoose');
const { models } =require('../utils/constant');
const { applyTimestamps } = require('./user.model');

const companySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String,
    },
    ownerId :{
        type:mongoose.Schema.Types.ObjectId,
        ref: models.USER,
        require:true
    }

},{timestamps:true});


const Company = mongoose.model(models.COMPANY,companySchema);

module.exports = Company;