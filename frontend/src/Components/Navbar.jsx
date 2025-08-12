import React, { useState } from "react";
import eraser from "../image/erase.png";
import pen from "../image/pen.png";
import GetALLUser from "./GetALLUser";
import RoomId from "./RoomId";

const Navbar = ({
  tool,
  setTool,
  lineWidth,
  setLineWidth,
  color,
  setColor,
  clearCanvas,
  undo,
  redo,
}) => {

 const [showUsers, setShowUsers] = useState(false);

const[showRoom,setShowRoom]=useState(false);

const  handleUsers=()=>{
  setShowUsers(true)
}


const showRoomId=()=>{
  setShowRoom(true)
}

  return (
  <div className="w-full bg-white shadow-md px-4 py-3 flex flex-wrap items-center justify-between gap-4 sm:gap-8 md:gap-16 lg:gap-32 xl:gap-64">

      {/* Left Icons */}
      <div className="flex gap-[20px]">
        <img
          src={eraser}
          className={`w-[24px] h-[24px] cursor-pointer ${
            tool === "eraser" ? "border-2 border-blue-500 rounded" : ""
          }`}
          onClick={() => setTool("eraser")}
          title="Eraser"
        />
        <select
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="px-2 py-1 border rounded"
        >
          <option value={1}>1px</option>
          <option value={5}>5px</option>
          <option value={10}>10px</option>
          <option value={20}>20px</option>
          <option value={40}>40px</option>
        </select>
        <img
          src={pen}
          className={`w-[24px] h-[24px] cursor-pointer ${
            tool === "pen" ? "border-2 border-blue-500 rounded" : ""
          }`}
          onClick={() => {
            console.log("you choose pen ");
            setTool("pen");
          }}
          title="Pen"
        />
        <select
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="px-2 py-1 border rounded"
        >
          <option value={1}>1px</option>
          <option value={5}>5px</option>
          <option value={10}>10px</option>
          <option value={20}>20px</option>
          <option value={40}>40px</option>
        </select>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-[40px] h-[30px] border cursor-pointer rounded"
        />
      </div>

      {/* Title */}
      <div>
        <h1 className=" font-bold">🧑‍🤝‍🧑 CollabBoard</h1>
      </div>
      <div   className="flex gap-[20px]">
        <button
          className="bg-red-500 text-white px-4 py-1 rounded"
          onClick={clearCanvas}
        >
          Clear Canvas
        </button>
        <button id='undo' onClick={undo}>Undo</button>
        <button id='redo' onClick={redo} >Redo</button>
        <button id='activeusers' onClick={handleUsers}>ShowOnlineUsers</button>
        <GetALLUser showUsers={showUsers} setShowUsers={setShowUsers}/>
        <button onClick={showRoomId} > RoomId</button>
        <RoomId  showRoom={showRoom} setShowRoom={setShowRoom} />
      </div>
   
    </div>
  );
};

export default Navbar;
