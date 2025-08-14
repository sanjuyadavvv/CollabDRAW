// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import connect from "./db.js";
import Drawing from "./models/Drawing.js";

dotenv.config();
connect();



const app = express();
app.use(cors());
app.use(express.json());


// Create server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// In-memory storage for online users
let onlineUsers = {};

// Socket.io logic
io.on("connection", (socket) => {
  console.log("🟢 User connected");

  socket.on("join-room", async (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);

    const existing = await Drawing.findOne({ roomId });
    if (existing) {
      socket.emit("load-canvas", existing.strokes);
    }
  });

  socket.on("draw", async ({ roomId, ...data }) => {
    let drawing = await Drawing.findOne({ roomId });
    if (!drawing) {
      drawing = new Drawing({ roomId, strokes: [data] });
    } else {
      drawing.strokes.push(data);
    }
    await drawing.save();
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

  socket.on("user-online", ({ user, roomId }) => {
    if (!onlineUsers[roomId]) onlineUsers[roomId] = [];

    onlineUsers[roomId] = onlineUsers[roomId].filter(
      (u) => u.socketId !== socket.id
    );

    onlineUsers[roomId].push({ ...user, socketId: socket.id });
    console.log("Online users:", onlineUsers[roomId]);

    socket.join(roomId);
    io.to(roomId).emit("update-online-users", onlineUsers[roomId]);
  });

  socket.on("disconnect", () => {
    for (const roomId in onlineUsers) {
      const index = onlineUsers[roomId].findIndex(
        (u) => u.socketId === socket.id
      );
      if (index !== -1) {
        onlineUsers[roomId].splice(index, 1);
        io.to(roomId).emit("update-online-users", onlineUsers[roomId]);
      }
    }
  });
});

// Routes
app.use("/api/auth", authRoutes);




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();


if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // Catch-all route for React frontend (must come AFTER API routes)
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}






// Start server
const port = process.env.PORT
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
