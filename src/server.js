import express from "express";
import {join} from "path";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", "src/views");
app.get("/", (req,res)=>res.render("home"));
app.use(express.static("src/static"))

const handleListening = ()=>{
    console.log(`Server running: http://localhost:${PORT}`)
}
app.listen(PORT, handleListening);
