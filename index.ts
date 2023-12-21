import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./src/modules/userModule/user.router";
import cluster from "cluster";
import os from "os";


if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        const port = 8000 + i;
        const worker = cluster.fork({ PORT: port });
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    const app = express();
    const port = process.env.PORT || 8000;
    const MONGO_Url = "mongodb://0.0.0.0:27017/user_crud";

    // parsing the request data
    app.use(express.json());
    app.use(cors());

    // mongoDb connection
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_Url).then(() => {
        console.log("\n*************MONGODB connected**************\n");
    }).catch(error => {
        console.log("unable to connect with database:", error);
    });
    // router
    app.use('/user', userRouter);

    // wrong url entered
    app.use((req, res) => {
        res.status(404).json({
            msg: "wrong url entered",
            status: "failure",
            statusCode: 404
        })
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}