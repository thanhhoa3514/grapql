import mongoose from "mongoose";
export interface IUser {
  email: string;
  fullname: string;
  password: string;
  token: string;
  deleted?: boolean;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    token: { type: String, trim: true},
    deleted: { type: Boolean, default: false },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

export default User;
