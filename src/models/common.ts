interface IPassKeeper {
    appname: string,
    email: string,
    username: string,
    password: string
}

interface IConfig {
    publicSecretKey: string,
}