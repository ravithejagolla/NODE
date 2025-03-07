
import express from 'express';
import router from './routers/notes.router.js';
import notesrouter from './routers/notes.router.js';
import {connect} from "mongoose"
const app= express();

app.use(express.json());

app.use("/user",router)
app.use("/notes",notesrouter)



app.listen(3000, async()=>{
try{
    await connect("mongodb://localhost:27017/LMS_DB")
    console.log("Connected to MongoDB");
    console.log("server runnign in http://localhost:3000")
}catch{
    console.error("Error connecting to MongoDB");
    process.exit(1);
}
})