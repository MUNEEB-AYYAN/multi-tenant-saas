import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password:{
        type:String,
        required:true
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization'
    },
    role:{
        type: String,
        enum: ["owner", "admin", "member"],
        default: "member"
    }
    
},{timestamps:true})


export default mongoose.model("User", userSchema)