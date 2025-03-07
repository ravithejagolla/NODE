import { Schema,model } from "mongoose";


const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String 
  });


  export const User = model("User", userSchema);
  
  