import inquirer from "inquirer";

import State from "./state/state";
import readWrite from './readWrite';
import { generate } from "./password-generator";
import { printPassKeeperLists } from "./utils/utils";
import { createLoadingSpinner, inquirerMasterPassword } from "./menu";
import { decryptPasswordInPassKeeperLists, encrypt, tryLogIn } from "./encryption";

export async function inquirerPassKeeperWithoutPassword(): Promise<IPassKeeper> {
    const answer = await inquirer.prompt(
        [
            {
                name: 'appname',
                type: 'input',
                prefix: '>',
                message: 'Enter app name:',
            },
            {
                name: 'username',
                type: 'input',
                prefix: '>',
                message: 'Enter username:',
            },
            {
                name: 'email',
                type: 'input',
                prefix: '>',
                message: 'Enter email:',
            }
        ]);

    return answer;
}

export async function inquirerPassKeeperWithPassword(): Promise<IPassKeeper> {
    const answer = await inquirer.prompt(
        [
            {
                name: 'appname',
                type: 'input',
                prefix: '>',
                message: 'Enter app name:',
            },
            {
                name: 'username',
                type: 'input',
                prefix: '>',
                message: 'Enter username:',
            },
            {
                name: 'email',
                type: 'input',
                prefix: '>',
                message: 'Enter email:',
            },
            {
                name: 'password',
                type: 'input',
                prefix: '>',
                message: 'Enter a new password:',
            }
        ]);

    return answer;
}

export const GenerateNewPassword = async () => {
    const passwords = readWrite.readPasswords();

    const passKeeper = await inquirerPassKeeperWithoutPassword();

    passKeeper.password = encrypt(generate(20));

    readWrite.writePassword([...passwords, passKeeper]);
}

export const CustomNewPassword = async () => {
    const passwords = readWrite.readPasswords();

    const passKeeper = await inquirerPassKeeperWithPassword();

    passKeeper.password = encrypt(passKeeper.password);

    readWrite.writePassword([...passwords, passKeeper]);
}

export const ListAllPasswords = async () => {
    const spinner = await createLoadingSpinner(`Loading...`, 1000);
    try {
        const passKeeperList = readWrite.readPasswords().filter(item => item.username !== "pass-keeper");
        try {
            printPassKeeperLists(decryptPasswordInPassKeeperLists(passKeeperList));
            spinner.success({ text: "Done\n" });
        }
        catch {
            spinner.error({ text: `The given master password is wrong\n` });
            State.setMasterPass(await inquirerMasterPassword());
        }
    }
    catch {
        spinner.error({ text: `Error while reading your passwords list file\n` });
    }
}

export const FindPasswordByAppname = async (appName: string) => {
    const spinner = await createLoadingSpinner(`Loading...`, 1000);
    try {
        const passKeeper = readWrite.readPasswords().filter(item => item.appname !== "pass-keeper").filter(item => item.appname.includes(appName));
        try {
            if (passKeeper) {
                printPassKeeperLists(decryptPasswordInPassKeeperLists([...passKeeper]));
            }
            spinner.success({ text: "Done\n" });
        }
        catch {
            spinner.error({ text: `The given master password is wrong\n` });
            State.setMasterPass(await inquirerMasterPassword());
        }
    }
    catch {
        spinner.error({ text: `Error while reading your passwords list file\n` });
    }
}

export const testPassword = async () => {
    const spinner = await createLoadingSpinner(`Loading...`, 1000);
    try {
        const passKeeperList = readWrite.readPasswords();
        const passKeeper = passKeeperList.find(item => item.appname === "pass-keeper")
        try {
            if(passKeeper) {
                if(tryLogIn(passKeeper)) {
                    spinner.success({ text: "Correct password\n" });
                }
            }
        }
        catch {
            spinner.error({ text: `The given master password is wrong\n` });
            State.setMasterPass(await inquirerMasterPassword());
            await testPassword();
        }
    }
    catch {
        spinner.error({ text: `Error while reading your passwords list file\n` });
    }
}