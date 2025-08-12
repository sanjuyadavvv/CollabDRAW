import jwt from 'jsonwebtoken'
const generateToken=(userId,res)=>{
const token=jwt.sign({id:userId},process.env.jwt_secret,{
    expiresIn:"7d"
})
return token;
}
export default generateToken;