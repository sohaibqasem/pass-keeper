interface IPassKeeper {
    appname: string,
    email: string,
    username: string,
    password: string
}

interface IConfig {
    publicSecretKey: string,
}

interface IEncrypt {
    iv: string,
    password: string,
    tag: string,
  }