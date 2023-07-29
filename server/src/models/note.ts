import { InferSchemaType, Schema, model } from "mongoose";

const notesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof notesSchema>;

export default model<Note>("Note", notesSchema);
