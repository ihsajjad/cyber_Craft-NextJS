import { UserDataType } from "@/lib/types";
import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema<UserDataType>({
  email: { type: String, required: [true, "Email doesn't exist"] },
  fullName: { type: String, required: [true, "FullName doesn't exist"] },
  password: { type: String, required: [true, "Password doesn't exist"] },
  role: { type: String, default: "User" },
});

const User = models.User || mongoose.model<UserDataType>("User", userSchema);

export default User;
