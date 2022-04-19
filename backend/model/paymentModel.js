const mongoose = require("mongoose")

const paymentSchema = mongoose.Schema({
    users:[{type:String,ref:"userData"}]
},{timestamp:true,collection: "paymentCollection",})