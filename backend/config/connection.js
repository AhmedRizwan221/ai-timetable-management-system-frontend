import mongoose from "mongoose";

async function connectmongoDB(url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default connectmongoDB;
