import './config/env.js';
import connectmongoDB from "./DB/connection.js";
import {app} from "./app.js";

// dotenv.config({
//     path:"./.env"
// });


// mongoDB connection 
connectmongoDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Database is connected on the PORT ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection Failed !!", error);
})
