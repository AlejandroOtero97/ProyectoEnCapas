import createServer from "./createServer.js";

export default function forkServer(httpServer, port) {
    createServer(httpServer, port);
}