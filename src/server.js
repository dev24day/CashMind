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
  //이 socket은 방금접속한 socket만을 의미
  console.log("connected succesfully");
  setTimeout(() => {
    socket.broadcast.emit("hello"); //server가 방금접속한 client 빼고 나머지에게 이벤트 발생시킴
  }, 3000);
  socket.on("helloguys", () => console.log("client says hello to server"));
});
