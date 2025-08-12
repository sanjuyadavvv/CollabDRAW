
// import React, { useState } from 'react'
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserDetails } from './features/userSlice';
// import { useNavigate } from 'react-router-dom';
import { GoogleAuthentication } from './GoogleAuthentication';
const SignUp = () => {


//   const dispatch=useDispatch();
//   const navigate=useNavigate();


//  const { userDetails}=useSelector((state)=>state.user)
//   const[formData,setFormData]=useState({
//     fullName:'',
//     email:'',
//     password:'',
//   })



// // authtoken
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };


// const handlelogin=()=>{
//   navigate('/Login')
// }


// const handleSubmit=async(e)=>{
//   e.preventDefault();
//   try {
// console.log(formData)
//     const res=await axios.post('http://localhost:3000/api/auth/signup',formData,{headers: {"Content-Type": "application/json"}});
//     console.log(res);



//     const{email,name}=res;

//     const currentUser={
//       email, fullName:name
//     }
//     let users = JSON.parse(localStorage.getItem("users") || "[]");

// const alreadyExists = users.some((u) => u.email === currentUser.email);

// if (alreadyExists) {
//   alert("User already exists! Please log in.");
//   return;
// }

// // Add new user
// users.push(currentUser);
// localStorage.setItem("users", JSON.stringify(users));

// // Now dispatch to Redux
// dispatch(setUserDetails(currentUser));
 
//   } catch (error) {
//     console.log('error submitting ',error)
//   }

// }
  return (


 

    //  <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-center
            h-[300px] w-[500px]
            sm:h-[500px] sm:w-[400px]
            bg-white rounded-lg shadow-[0_0_30px_5px_rgba(0,0,0,0.2)] p-6">
    
        <h1 className="text-4xl font-bold mb-10">SignUp</h1>
    
        {/* <form  onSubmit={handleSubmit}>
        <p className='gap-x-0.5 p-1 font-medium'><label className='pr-10' >Name</label>
        <input  className='pl-2 border'type='text' placeholder='enter name '  name="fullName" value={formData.fullName} onChange=5{handleChange}/></p>

        <p className='gap-x-0.5 p-1 font-medium'><label className='pr-10'  >Email</label>
        <input  className='pl-2 border'type='text' placeholder='enter mail ' name='email' value={formData.email} onChange={handleChange}/></p>


        <p className='gap-x-0.5 p-1 font-medium'><label className='pr-10'  >Password </label>
        <input  className='pl-0.8 border'type='password' placeholder='enter password' name='password' value={formData.password} onChange={handleChange} /></p>
   
</form> */}


<div className='flex items-center pt-20 pl-40'>
  {/* <button className='w-100 border bg-blue-500 text-white'type='submit'> Create Account</button> */}
</div>   


{/* <p>Already Have an account ? <button onClick={handlelogin}>Login</button></p>   */}
<GoogleAuthentication  />

<div>
{/* <p>Already have a room?</p> */}
{/* <input placeholder='enter room id ' /> */}
</div>


        </div>
        

    // </div>

    
  )
}

export default SignUp
