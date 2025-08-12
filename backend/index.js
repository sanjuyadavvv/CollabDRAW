// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
dotenv.config();
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import connect from './db.js'
import Drawing from './models/Drawing.js';
const app = express();
app.use(cors());


app.use(express.json());
const server = http.createServer(app);
// const Drawing = require('./models/Drawing');

// const connectToMongo = require('./db'); // path to your db.js
connect();

// const server = http.createServer(app);

// 🧠 Store drawings per room in-memory
const roomDrawings = {};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


let onlineUsers ={};


io.on("connection", (socket) => {
  console.log("🟢 User connected");

  socket.on("join-room", async(roomId) => {
    socket.join(roomId);

    console.log(`User joined room ${roomId}`);



    const existing= await Drawing.findOne({roomId});
    if(existing){
      socket.emit("load-canvas",existing.strokes)
    }

    // Send saved strokes if any
    // if (roomDrawings[roomId]) {
    //   socket.emit("load-canvas", roomDrawings[roomId]);
    // }
  });

  socket.on("draw", async({ roomId, ...data }) => {
    // Save drawing in memory
   let drawing = await Drawing.findOne({ roomId });
  if (!drawing) {
    drawing = new Drawing({ roomId, strokes: [data] });
  } else {
    drawing.strokes.push(data);
  }
  await drawing.save();
    // Broadcast to other users in the room
    socket.to(roomId).emit("draw", data);
  });




socket.on("clear-canvas", async (roomId) => {
 await Drawing.updateOne({ roomId }, { $set: { strokes: [] } });
  io.to(roomId).emit("clear-canvas");
});


  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
  });


socket.on('user-online', ({ user, roomId }) => {
  if (!onlineUsers[roomId]) onlineUsers[roomId] = [];

  onlineUsers[roomId] = onlineUsers[roomId].filter(
    u => u.socketId !== socket.id
  );

  onlineUsers[roomId].push({ ...user, socketId: socket.id });
  console.log('online user details are ', onlineUsers[roomId]);

  socket.join(roomId);

  io.to(roomId).emit('update-online-users', onlineUsers[roomId]);
});

socket.on('disconnect', () => {
  for (const roomId in onlineUsers) {
    const index = onlineUsers[roomId].findIndex(u => u.socketId === socket.id);
    if (index !== -1) {
      onlineUsers[roomId].splice(index, 1);
      io.to(roomId).emit("update-online-users", onlineUsers[roomId]); // fixed
    }
  }
});

});

// Start the server
const PORT = 3000;


// import authRoutes from './routes/authRoutes.js'
app.use('/api/auth',authRoutes)




server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});