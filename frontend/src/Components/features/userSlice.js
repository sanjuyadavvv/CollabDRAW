import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  userDetails: {
    fullName: "",
    token: "",
    socket: null,
    email: " ",
  },
  allUsers: [],
  roomId:""
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { fullName, email, password, token } = action.payload;
      state.userDetails.fullName = fullName;
      state.userDetails.email = email;
      state.userDetails.password = password;
      state.userDetails.token = token;
      state.isLoggedIn = true;
      console.log("userDetails are ", state.userDetails);
      
    },
    logoutUser: (state) => {
      state.userDetails = { fullName: "", email: "", password: "", token: "" };
      state.isLoggedIn = false;
    },
    getAllUser: (state) => {
      state.allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    },
    setRoomId:(state,action)=>{
      state.roomId=action.payload
    }
  },
});
export const { logoutUser, setUserDetails, getAllUser ,setRoomId} = UserSlice.actions;

export default UserSlice.reducer;
