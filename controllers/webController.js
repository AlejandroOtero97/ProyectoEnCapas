const webControllers = {
    inicio: (req, res) => {
        res.sendFile('index.html', { root: './public/views' })
    },
    login: (req, res) => {
        res.sendFile('login.html', { root: './public/views' })
    },
    error: (req, res) => {
        res.sendFile('error.html', { root: './public/views' })
    },
    logoutB: (req, res) => {
        res.sendFile('logout.html', { root: './public/views' })
    },
    signup: (req, res) => {
        res.sendFile('register.html', { root: './public/views' })
    },
    info: (req, res) => {
        res.sendFile('dataStats.html', { root: './public/views' })
    },
    random: (req, res) => {
        res.sendFile('random.html', { root: './public/views' })
    },
    infoZip: (req, res) => {
        res.sendFile('infoZip.html', { root: './public/views' })
    },
}

export default webControllers;