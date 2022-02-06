import { readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';


const readFileJson = (filename: string) : string | null => {
    try {
        const data = readFileSync(`${homedir()}/pass-keeper/${filename}.json`, {encoding:'utf8', flag:'r'});
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
    const data = readFileJson("passwords");
    if(data) {
        passKeeperList = JSON.parse(data);   
    }
    return passKeeperList;
}

const readConfig = () : IConfig | null => {
    let config : IConfig | null;
    const file = readFileJson(`${homedir()}/pass-keeper/config.json`);
    if(file) {
        config = JSON.parse(file);   
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