import express from 'express';
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectToSocket } from './controllers/socketManager.js';
import  userRoutes  from './routes/users.routes.js';


const app = express();
const server = createServer(app);
const io = connectToSocket(server);


// const mongo_url = "mongodb+srv://pratikshaankushrao7:QM5HDmdCz1QphT9U@cluster0.qm1fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    
    app.set("mongo_user");

    const connectionDb = await mongoose.connect("mongodb+srv://pratikshaankushrao7:QM5HDmdCz1QphT9U@cluster0.qm1fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
        console.log("Server is running on port 8000");
    });
};


start();
