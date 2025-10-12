import mongoose from "mongoose";

async function connectmongoDB(url) {
  return mongoose.connect(url)
  
}

export default connectmongoDB;
