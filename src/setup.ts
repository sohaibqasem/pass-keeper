import { existsSync, mkdirSync } from "fs";
import { homedir } from "os";

import { inquirerMasterPassword, Logo, setupMsg } from "./menu";
import { generate } from "./password-generator";
import { testPassword } from "./handlers";
import readWrite from "./readWrite";
import State from "./state/state";

export const setup = async () => {
    const dir = `${homedir()}/pass-keeper/`;

    if (existsSync(dir)) {
        await Logo();
        State.setMasterPass(await inquirerMasterPassword());
        const config = readWrite.readConfig();
        State.setPublicKey(config?.publicSecretKey!!);
        await testPassword();
        return;
    } else {
        mkdirSync(dir);
        await setupMsg();
        State.setMasterPass(await inquirerMasterPassword());

        if (State.getMasterPass()) {
            const publicKey = generate(32);
            readWrite.writeConfig({
                publicSecretKey: publicKey
            });
            State.setPublicKey(publicKey);
            readWrite.writePassword([]);
        }
    }
}