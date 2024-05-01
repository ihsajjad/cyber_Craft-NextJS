import { ContactType } from "@/lib/types";
import mongoose, { models } from "mongoose";

const contactSchema = new mongoose.Schema<ContactType>({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Eiail is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  message: { type: String, required: [true, "Message is required"] },
});

const Contact = models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
