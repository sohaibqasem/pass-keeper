import { existsSync, mkdirSync } from "fs";
import { homedir } from "os";

import { inquirerMasterPassword, Logo, setupMsg } from "./menu";
import { generate } from "./password-generator";
import { testPassword } from "./handlers";
import readWrite from "./readWrite";
import State from "./state/state";
import { encrypt } from "./encryption";

export const setup = async (password: string) => {
    const dir = `${homedir()}/pass-keeper/`;

    if (existsSync(dir)) {
        await Logo();
        State.setMasterPass(password ? password : await inquirerMasterPassword());
        const config = readWrite.readConfig();
        State.setPublicKey(config?.publicSecretKey!!);
        setupPasswordsFileForFirstTime();
        await testPassword();
    } else {
        mkdirSync(dir);
        await setupMsg();
        State.setMasterPass(password ? password : await inquirerMasterPassword());

        if (State.getMasterPass()) {
            const publicKey = generate(32);
            readWrite.writeConfig({
                publicSecretKey: publicKey
            });
            State.setPublicKey(publicKey);
            setupPasswordsFileForFirstTime();
        }
    }
}

const setupPasswordsFileForFirstTime = () => {
    if (!readWrite.readPasswords().find(item => item.appname === "pass-keeper")) {
        const passKeeper: IPassKeeper = {
            appname: "pass-keeper",
            username: "pass-keeper",
            email: "passkpr@setup.com",
            password: "passkpr1@3$5^1"
        }

        passKeeper.password = encrypt(passKeeper.password);

        readWrite.writePassword([passKeeper]);
    }
}