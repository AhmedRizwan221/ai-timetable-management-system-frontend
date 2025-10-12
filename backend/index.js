import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectmongoDB from "./config/connection.js";
import authRoute from "./routes/authRoute.js";


dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// routes 
app.use('/user', authRoute);


// mongoDB connection 
connectmongoDB(process.env.MONGO_URL)
.then(() => console.log(`Mongo DB is connected`))
.catch((error) => console.log(error))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));