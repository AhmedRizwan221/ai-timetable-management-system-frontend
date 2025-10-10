import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectmongoDB from "./connection.js";
import authRoute from "./routes/authRoute.js";


dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

app.use('/user', authRoute);

// app.get('/', (req, res) => {
//     res.json({msg: "server is running I think it's fine"});
// })


// mongoDB connection 
connectmongoDB(process.env.MONGO_URI)
.then(() => console.log('Mongo DB is connected '))
.catch((error) => console.log(error))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));