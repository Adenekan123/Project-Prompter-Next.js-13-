import mongoose, { mongo } from "mongoose";

let isConnected = false; //track connection

export const connectToDB = async()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"shareprompt",
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        isConnected = true;
        console.log('MongoDB connected')
    }catch(err){
        console.log(err);
    }
}