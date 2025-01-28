
import express from 'express'
import {connect} from 'mongoose'
import env from'dotenv'
env.config()
import router from './routers/userRouter.js'
const app = express()

app.use(express.json())
app.use('/user',router)


const PORT=process.env.Port
const mongo_url=process.env.Mongo_Url

app.listen(PORT,async()=>{
    try{
        connect(mongo_url)
        console.log("Mongodb connected successfully")
        console.log(`server running on ${PORT}`)
    }catch(e){
        console.error("Error connecting to mongodb",e)
        process.exit(1)
    }
})