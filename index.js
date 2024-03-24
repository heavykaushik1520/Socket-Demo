const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data); // Broadcast to all clients except the sender
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(9000, () => {
    console.log("Server listening on port 9000");
});
