import { readFile, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';

interface IPassKeeper {
    appname: string,
    email: string,
    username: string,
    password: string
}

interface IConfig {
    publicSecretKey: string,
}

const readFileJson = (filename: string) : Buffer | null => {
    try {
        const fileBuffer = readFileSync(`${homedir()}/pass-keeper/${filename}.json`);
        const data = JSON.parse(fileBuffer.toString());
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
}

const WriteFileJson = (filename: string, content: string) : void => {
    try {
        writeFileSync(`${homedir()}/pass-keeper/${filename}.json`, content);
      } catch (err) {
        console.log(err);
      }
}

const readPasswords = () : Array<IPassKeeper>  => {
    let passKeeperList : Array<IPassKeeper> | [] = [];
    const buffer = readFileJson("passwords");
    if(buffer) {
        passKeeperList = JSON.parse(buffer.toString());   
    }
    return passKeeperList;
}

const readConfig = () : IConfig | null => {
    let config : IConfig | null;
    const buffer = readFileJson(`${homedir()}/pass-keeper/config.json`);
    if(buffer) {
        config = JSON.parse(buffer.toString());   
    } else {
        config = null;
    }
    return config;
}

const writePassword = (passKeeperList: Array<IPassKeeper>) => {
    WriteFileJson("passwords", JSON.stringify(passKeeperList))
}

const writeConfig = (passKeeperConfig: IConfig) => {
    WriteFileJson("config", JSON.stringify(passKeeperConfig))
}

export default {
    writePassword,
    writeConfig,
    readPasswords,
    readConfig
}