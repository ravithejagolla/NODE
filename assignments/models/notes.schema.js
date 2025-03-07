
import { Schema ,model} from 'mongoose';
const noteSchema = new Schema({
    title: String,
    content: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });
  

    export const Note = model("Note", noteSchema);