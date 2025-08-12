import mongoose from 'mongoose'

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:false,
            minLength:6,
        },
        authSource:{
            type:String,
            enum:["self","google"],
            default:"self"
        }
    },
    {timestamps:true}
)


const User=mongoose.model("USer",userSchema)
export default User;