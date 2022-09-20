# ServidoresNode & Loggers

nodemon:
    nodemon server.js -p 3000 -m FORK
    nodemon server.js -p 3000 -m CLUSTER


pm2:
    pm2 start server.js --name=server8080 --watch -- -p 8080
    pm2 start server.js --name=server8081 --watch -- -p 8081
    pm2 start server.js --name=server8082 --watch -- -p 8082

