
import {Schema, model} from 'mongoose';

const todoSchema = new Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });

export const Todo = model("Todo", todoSchema);