import { SignUpType } from "@/lib/types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<SignUpType>({
  email: { type: String, required: [true, "Email doesn't exist"] },
  fullName: { type: String, required: [true, "FullName doesn't exist"] },
  password: { type: String, required: [true, "Password doesn't exist"] },
});

const User = mongoose.model<SignUpType>("User", userSchema);

export default User;
