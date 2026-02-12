import mongoose from 'mongoose'

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to Database successfully');
    } catch (e) {
        console.log('Db connection error',e);
        process.exit(1)
    }
}

export default connectDB