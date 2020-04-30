import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", "src/views");
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));
app.get("/", (req, res) => res.render("home"));

const handleListening = () => {
  console.log(`Server running: http://localhost:${PORT}`);
};
const server = app.listen(PORT, handleListening);

const io = socketIO(server);

io.on("connection", socket => {
  socket.emit("join");
  socket.on("newMessage", data => {
    //newMessage 이벤트에 포함된 data
    console.log(`New Message Received: ${data.message}`);
    socket.broadcast.emit("msgNotification", {
      message: data.message,
      nickname: socket.nickname || "anon"
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
