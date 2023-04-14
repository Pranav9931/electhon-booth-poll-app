const express = require("express");
const app = express();

const cors = require("cors");

// Allow cross-origin requests
app.use(cors());

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("newVoterData", (data) => {
    socket.broadcast.emit("newVoterData", data);
  });
});

httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});
