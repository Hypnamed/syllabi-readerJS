import { Schema, model, models } from "mongoose";

const postSchema = new Schema({ msg: String }, { timestamps: true });

const postModel = models.post || model("post", postSchema);

export default postModel;
