const PORT = process.env.PORT || 8080

export default function createServer(httpServer, port) {
    httpServer.listen(PORT, () => {
        console.log(
            `Escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
        );
    });
}
