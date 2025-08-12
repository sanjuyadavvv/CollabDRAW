import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
// Connect socket outside component
const socket = io("http://localhost:3000");

const GetALLUser = ({showUsers,setShowUsers}) => {
  const currentUser = useSelector((state) => state.user.userDetails);
console.log('current user is ',currentUser)

  const roomId=useSelector((state)=>state.user.roomId)
  const [onlineUsers, setOnlineUsers] = useState({});

useEffect(() => {
 socket.on("update-online-users", (users) => {
      console.log("Online users from server:", users);
      setOnlineUsers(users);
    });

    // Notify server that user is online (and join room)
    socket.emit("user-online", { user: currentUser, roomId })

  return () => {
    socket.off("update-online-users");
  };
}, [currentUser, roomId]);



// useEffect(()=>{
// socket.on('update-online-users',(users)=>{
//   setOnlineUsers(users);
// })

// socket.emit("user-online", { user: currentUser, roomId })
// return ()=>socket.off("update-online-users");
// },[])



// useEffect(()=>{
// if(currentUser && roomId){
//   socket.emit('user-online',{user:currentUser,roomId})
// }
// },[currentUser,roomId])
  return (
    <div className="relative">
      {/* Button to open */}
      {/* <button
        onClick={() => setShowUsers(true)}
        className="px-4 py-2 bg-blue-500  text-white rounded"
      >
        Show Online Users
      </button> */}

      {showUsers && (
        <>
          
          <div
            onClick={() => setShowUsers(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

  
          <div className="fixed top-1/2 left-1/2 w-[400px] h-[500px] 
                          -translate-x-1/2 -translate-y-1/2 
                          bg-[white] rounded-lg shadow-[0_0_30px_5px_rgba(0,0,0,0.2)] z-50 p-4 flex flex-col">
           
            <div className="flex justify-center items-center border-b pb-2">
              <h3 className="text-lg font-semibold">Online Users</h3>
              <button
                onClick={() => setShowUsers(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>
{console.log('online usres are',onlineUsers)}

           <ul className="mt-4 space-y-2 overflow-y-auto">
  {onlineUsers.map((user, idx) => (
    <li key={user.socketId || idx} className="bg-gray-100 p-2 rounded">
      {user.fullName} — {user.email}
    </li>
  ))}
</ul>
          </div>
        </>
      )}
    </div>
  );
};

export default GetALLUser;
