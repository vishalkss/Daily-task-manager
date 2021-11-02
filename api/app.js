const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const tasks = require("./routes/tasks");
const login = require("./routes/login");
const connectDB = require('./db/connect')
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`app is listening on ${port}`));
    } catch (error) {
        console.log(error);
        
    }
}

start();

//middleware
app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use("/api/v1/login", login);

app.use(notFound);
app.use(errorHandlerMiddleware);
