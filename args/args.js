import yargsParser from "yargs/yargs";

const yargs = yargsParser(process.argv.slice(2));

let { port, fork, dev } = yargs
    .alias({
        p: "port",
        f: "fork",
        d: "dev",
    })
    .boolean(["d", "f"])
    .default({
        port: 8080,
        fork: false,
        dev: false,
    }).argv;

if (!dev) {
    port = process.env.PORT;
}

export { port, fork, dev };
