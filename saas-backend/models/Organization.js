import mongoose from 'mongoose'

const organizationSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    plan:{
        type:String,
        enum:['free','pro'],
        default:'free'
    }

},{timestamps:true})

export default mongoose.model("Organization", organizationSchema)
