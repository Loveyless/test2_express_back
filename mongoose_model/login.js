//这个中间件包括添加管理员和登录
const mongoose  = require("mongoose")

let Schema = mongoose.Schema

let rootRule = new Schema({ username:{ type:String, required:true, unique:true }, password:{ type:String, required:true } })

module.exports = mongoose.model("root_lists",rootRule);








