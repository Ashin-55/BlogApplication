const mongoose = require("mongoose")


const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.mongoURL,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log(`Mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error is :${error.message}`)
        process.exit(1);
    }
}

module.exports =  connectDB;