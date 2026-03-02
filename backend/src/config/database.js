import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB is conected ')
    }
    catch(err) {
        console.log(err)
    }
}


export default ConnectDB