import { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { io } from "socket.io-client";
// import GetALLUser from "./GetALLUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setRoomId } from "./features/userSlice";

const socket= io("https://collabboard-cseg.onrender.com");

const Whiteboard = () => {


  const { roomId } = useParams();

  const currentUser = useSelector((state) => state.user.userDetails);
    const dispatch=useDispatch();

  //  const {currentRoom}=useSelector((state)=>state.user.roomId)
   
  

  const [tool, setTool] = useState("pen");
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // Stacks as refs so they survive re-renders
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  // prev pos for drawing
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // set size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // get context with willReadFrequently to avoid warning
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.lineCap = "round";
    ctxRef.current = ctx;

    // initialize lineWidth from state
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    // push initial blank snapshot so undo has a base state
    undoStack.current = []; // ensure fresh
    undoStack.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStack.current = [];

    // socket handlers
    const handleDraw = ({ x0, y0, x1, y1, tool, color, lineWidth }) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    };

    socket.emit("join-room", roomId);
    socket.on("draw", handleDraw);

    socket.on("load-canvas", (savedDrawings) => {
      for (let stroke of savedDrawings) handleDraw(stroke);
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("draw", handleDraw);
      socket.off("load-canvas");
    };
    // note: roomId only dependency so effect runs when room changes
  }, [roomId]);

  // keep ctx settings in sync when lineWidth or color changes
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
  }, [lineWidth, color]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // push cleared state as an action (optional)
    undoStack.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStack.current = [];
    socket.emit("clear-canvas", roomId);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    // clear redo on new action
    redoStack.current = [];
    prevPos.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };



  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;
    const { x: prevX, y: prevY } = prevPos.current;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    socket.emit("draw", {
      roomId,
      x0: prevX,
      y0: prevY,
      x1: currentX,
      y1: currentY,
      tool,
      color,
      lineWidth,
    });

    prevPos.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // save snapshot once per stroke
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current.push(snapshot);
    // clear redo because new action invalidates future
    redoStack.current = [];
  };

  const undo = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    if (undoStack.current.length > 1) {
      const lastImage = undoStack.current.pop();
      redoStack.current.push(lastImage);

      const prevImage = undoStack.current[undoStack.current.length - 1];
      if (prevImage) ctx.putImageData(prevImage, 0, 0);
    }
  };

  const redo = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    if (redoStack.current.length > 0) {
      const redoImage = redoStack.current.pop();
      undoStack.current.push(redoImage);
      ctx.putImageData(redoImage, 0, 0);
    }
  };


useEffect(() => {
  if (roomId) dispatch(setRoomId(roomId));
}, [roomId, dispatch]);




  return (
    <>
      <Navbar
        tool={tool}
        setTool={setTool}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        color={color}
        setColor={setColor}
        clearCanvas={clearCanvas}
        undo={undo}
        redo={redo}
      />
        {/* <GetALLUser currentUser={currentUser} /> */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className={`absolute top-0 left-0 bg-white`}
      />

    </>
  );
};

export default Whiteboard;
