const mongoose =  require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: String,
    userName:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    userType:{
        type:String,
        enum: ['student', 'teacher', 'accounts'],
        default: 'student'
    },
    email: {
        type:String,
        required: true,
        unique:true,
        trim:true
    },
    password: String,
    image: String,
    otp: '',
    isDelete: {
        type:Boolean,
        default: false
    }

})

// pre hashing password
userSchema.pre('save', async function(next){
    let user = this;
    const hashedPassword =  await bcrypt.hash(user.password,10);
    user.password= hashedPassword;
    next();
})


module.exports = mongoose.model('user',userSchema);