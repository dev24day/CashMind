// eslint-disable-next-line no-undef
const socket = io("/"); //서버에 연결됨
// eslint-disable-next-line no-unused-vars
function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}
function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}
socket.on("join", () => console.log("Welcome!"));
socket.on("msgNotification", data => {
  console.log(`${data.nickname}: ${data.message}`);
});
