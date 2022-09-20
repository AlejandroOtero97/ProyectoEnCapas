import cluster from "cluster";
import os from "os";
import createServer from "./createServer.js";

const cantCpus = os.cpus().length;

export default function clusterServer(httpServer, port) {
    if (cluster.isPrimary) {
        for (let i = 0; i < cantCpus; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died!`);
            cluster.fork();
        });
    } else {
        createServer(httpServer, port);
    }
}
