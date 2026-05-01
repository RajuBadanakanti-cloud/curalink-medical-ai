import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDb connected successfully")

    }catch(err){
        console.log("MongoDb connection failed!")
        console.log(err)
        process.exit(1)
    }
}

export default connectDB