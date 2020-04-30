// eslint-disable-next-line no-undef
const socket = io("/"); //서버에 연결됨
socket.on("hello", () => console.log("Somebody say hello"));
setTimeout(() => {
  socket.emit("helloguys");
}, 4000);
