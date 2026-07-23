// Load environment variables
require('dotenv').config();

// emit events
// socket.emit, io.emit, socket.broadcast.emit

// emit to a specific room
// io.to(room).emit, socket.broadcast.to(room).emit

const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { createClerkClient } = require("@clerk/backend");
const {
  generateMessage,
} = require("./utils/messages");

// Clerk client for verifying session tokens sent by the browser.
// CLERK_SECRET_KEY must be set in the server environment (.env) — never
// expose the secret key to the client, only the publishable key.
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/user");

// initialize express
const app = express();
// initialize http server
const server = http.createServer(app);
// initialize socketio
const io = socketio(server);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0'; // Tüm IP'lerden erişime izin ver
// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

// let's listen for new connections
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // socket.emit("message", generateMessage("Welcome!"));
  // socket.broadcast.emit("message", "A new user has joined!");

  socket.on("join", async ({ username, room, token }, callback) => {
    // Reject anyone who didn't come through the Clerk-authenticated login page.
    if (!token) {
      return callback("Not authenticated");
    }

    let verified;
    try {
      verified = await clerkClient.verifyToken(token);
    } catch (err) {
      console.error("Clerk token verification failed:", err.message);
      return callback("Authentication failed");
    }

    // Confirm the claimed username actually matches the authenticated Clerk user
    // so a client can't send someone else's username with their own valid token.
    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(verified.sub);
    } catch (err) {
      console.error("Failed to load Clerk user:", err.message);
      return callback("Authentication failed");
    }

    if (clerkUser.username !== username) {
      return callback("Username does not match authenticated account");
    }

    // specifically emit event according to room name eg: no one can check whats going on in another room
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(room);
    socket.emit("message", generateMessage("Admin", "Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage("Admin", `${user.username} has joined`));
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    const user = getUser(socket.id);

    if (!user) {
      return callback("You are not authenticated");
    }

    // if (filter.isProfane(message)) {
    //   return callback("Profanity is not allowed!");
    // }

    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  //   socket.emit("countUpdated", count);

  //   socket.on("increment", () => {
  //     count++;
  // notify only the current connection
  // socket.emit("countUpdated", count);

  // notify all connections
  //     io.emit("countUpdated", count);
  //   });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });


});

// Change the server.listen line to this:
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is up on port ${port}!`);
});

