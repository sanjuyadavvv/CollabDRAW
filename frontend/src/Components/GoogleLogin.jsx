// import { useGoogleLogin } from "@react-oauth/google";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "./features/userSlice";

// const GoogleLogin = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//      console.log('login is clicked ')
//     const login = useGoogleLogin({

      
//         onSuccess: async (tokenResponse) => {
//             try {
//                 // Step 1: Get user info from Google
//                 console.log('token response in google is ',tokenResponse)
//                 const { data: userInfo } = await axios.get(
//                     `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
//                 );
                
//                 const { email, name } = userInfo;

//                 // Step 2: Send email & name to your backend
//                 const res = await axios.post("http://localhost:3000/api/auth/googlelogin", {
//                     email,
//                     fullName: name
//                 });

//                 // Step 3: Save to Redux and navigate
//                 dispatch(setUserDetails(res.data.user));
//                 navigate("/createroom");

//             } catch (err) {
//                 console.error("Google login failed:", err);
//                 alert("Login failed");
//             }
//         },
//         onError: (err) => {
//             console.error("Google OAuth error:", err);
//             alert("Login failed");
//         }
//     });

//     return (
//         <div className="App">
//             <button onClick={login}>Login with Google</button>
//         </div>
//     );
// };

// export default GoogleLogin;
