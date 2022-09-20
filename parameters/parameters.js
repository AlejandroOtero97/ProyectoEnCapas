import yargsParser from 'yargs/yargs';

const yargs = yargsParser(process.argv.slice(2))

const { port, mode } = yargs
    .alias({
        p: 'port',
        m: 'mode'
    })
    .default({
        port: 8080,
        mode: 'FORK'
    })
    .argv;

export { port, mode };