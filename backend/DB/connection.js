import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

const connectmongoDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
    console.log(`\n MongoDB is connected !! DB host: ${connectionInstance.connection.host}`);

  } catch (error) {
    console.log("MongoDB connection error ", error)
    process.exit(1);
  }
}

export default connectmongoDB
