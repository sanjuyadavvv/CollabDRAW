// // LoginPage.jsx
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "./features/userSlice";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       const { data: userInfo } = await axios.get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
//       );
//       const { email, name } = userInfo;
//       const res = await axios.post("http://localhost:3000/api/auth/googlelogin", {
//         email,
//         fullName: name
//       });

//       dispatch(setUserDetails(res.data.user));
//       navigate("/createroom");
//     },
//     onError: (err) => {
//       console.error("Google login failed", err);
//     },
//   });

//   return (
//    <div className="flex flex-col justify-center items-center min-h-screen p-6 rounded-lg bg-white [box-shadow:0_0_15px_5px_rgba(0,0,0,0.3)]">
//   <h2 className="text-xl font-semibold mb-4">Login Page</h2>
//   <button 
//     onClick={() => googleLogin()} 
//     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//   >
//     Login with Google
//   </button>
// </div>
//   );
// };

// export default LoginPage;

