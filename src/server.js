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
  //client가 연결되면 자동으로 connection이벤트가 발생된것
  console.log("connected succesfully");
  setTimeout(() => {
    socket.emit("hello"); //server가 socket에게hello란 이벤트를 발생시킴
  }, 3000);
});
