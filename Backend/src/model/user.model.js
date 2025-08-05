const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { models } =require('../utils/constant');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    role:{ type: String, enum: ['student', 'recuiter', 'admin'], default: 'student' ,require:true},
    profile:{
        bio:{type:String},
        skills:[{type:String ,default:[]}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId ,ref: models.COMPANY},
        profilePhoto:{type:String, default:''}
    },
    company_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: models.COMPANY,
            require:true
    }
},{timestamps:true});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  return next();
});

const User = mongoose.model(models.USER,userSchema);

module.exports = User;