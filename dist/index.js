"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const cors_1 = require("cors");
const user_router_1 = require("./src/modules/userModule/user.router");
const cluster_1 = require("cluster");
const os_1 = require("os");
// Function to create a simple Round-robin load balancer
function createLoadBalancer(workers) {
    let index = 0;
    return (req, res) => {
        const worker = workers[index];
        index = (index + 1) % workers.length;
        // Forward the request to the selected worker
        worker.send(req.url, (response) => {
            res.send(response);
        });
    };
}
if (cluster_1.default.isPrimary) {
    // Fork workers equal to the number of CPU cores
    const numCPUs = os_1.default.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    // Handle worker exit and fork a new one
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    const port = 3000;
    const MONGO_Url = "mongodb://0.0.0.0:27017/user_crud";
    // parsing the request data
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(MONGO_Url).then(() => {
        console.log("\n*************MONGODB connected**************\n");
    }).catch(error => {
        console.log("unable to connect with database:", error);
    });
    // App testing
    app.get('/ping', (req, res) => {
        res.status(200).json({
            status: true,
            message: "App is working",
        });
    });
    // Catch-all route for handling wrong endpoint
    // app.use('/api', createLoadBalancer([cluster.worker]));
    // app.use('/api', createLoadBalancer(Object.values(cluster.workers).filter(Boolean)));
    app.get('/api/example', (req, res) => {
        res.status(200).json({
            status: true,
            message: "Example route working",
        });
    });
    // router
    app.use('/user', user_router_1.default);
    app.listen(port, () => {
        console.log(`Server running on process ${process.pid}, port ${port}`);
    });
}
