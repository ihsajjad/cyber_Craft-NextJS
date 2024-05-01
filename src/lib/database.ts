import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  isConnected = true;

  console.log("MongoDB is connected successfully.");

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "contact-management",

      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};
