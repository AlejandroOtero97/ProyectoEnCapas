import { fork } from "./../args/args.js";
import clusterServer from "./clusterServer.js";
import forkServer from "./forkServer.js";

export default function initializeServer(httpServer, port) {
    if (fork) {
        forkServer(httpServer, port);
    } else {
        clusterServer(httpServer, port);
    }
}
