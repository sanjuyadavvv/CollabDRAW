import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const CreateRoom = () => {
      const navigate = useNavigate();

      const [id, setID] = useState(''); // ✅ fix destructuring
    
      const handleCreateRoom = () => {
        const roomId = uuidv4();
        console.log('id craeted on Hime pafe is ',roomId)
        navigate(`/room/${roomId}`);
      };
    
      const handleJoinRoom = () => {
        if (id.trim() !== '') {
          navigate(`/room/${id}`);
        }
      };
  return (
     <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[#a4a9db]">
      <h1 className="text-3xl font-bold">Welcome to CollabBoard</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded  h-[50px] "
        onClick={handleCreateRoom}
      >
        Create New Room
      </button>


      <p>OR</p>

      <div className="flex gap-20 mt-4">
        <input
          type="text"
          value={id}
          onChange={(e) => setID(e.target.value)} // ✅ updates state
          placeholder="Enter Room ID"
          className="border px-2 py-1 rounded h-[50px] text-center"
        />
        <button
          className="bg-green-600 text-white px-4 py-1 rounded h-[54px]"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  )
}

export default CreateRoom
