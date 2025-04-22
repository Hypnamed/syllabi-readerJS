import { Schema, model, models } from "mongoose";

const usersSchema = new Schema(
  {
    userID: String,
    userName: String,
    userEmail: String,
    userPassword: String,
    userSyllabis: Array,
    userClasses: Array,
    userDateSigned: String,
  },
  { _id: true },
  { timestamps: true }
);

const usersModel = models.users || model("users", usersSchema);

export default usersModel;
export { usersSchema };
