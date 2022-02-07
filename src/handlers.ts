import inquirer from "inquirer";
import readWrite from './readWrite';
import { printPassKeeperLists } from "./utils";
import { generate } from "./password-generator";

export async function inquirerPassKeeperWithoutPassword(): Promise<IPassKeeper> {
    const answer = await inquirer.prompt(
        [
            {
                name: 'app name',
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
                name: 'app name',
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

    passKeeper.password = generate(20);

    readWrite.writePassword([...passwords, passKeeper]);
}

export const CustomNewPassword = async () => {
    const passwords = readWrite.readPasswords();

    const passKeeper = await inquirerPassKeeperWithPassword();

    readWrite.writePassword([...passwords, passKeeper]);
}

export const ListAllPasswords = () => {
    const passKeeperList = readWrite.readPasswords();    
    printPassKeeperLists(passKeeperList);
}

export const FindPasswordByAppname = () => {
    //TODO (sohaib): To Implement
}