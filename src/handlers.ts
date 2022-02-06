import inquirer from "inquirer";
import { generate } from "./password-generator";
import readWrite from './readWrite';

export async function inquirerPassKeeperObj(): Promise<IPassKeeper> {
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

export const GenerateNewPassword = async () => {
    const passwords = readWrite.readPasswords();

    const passKeeper = await inquirerPassKeeperObj();

    passKeeper.password = generate(20);

    readWrite.writePassword([...passwords, passKeeper])
}

export const CustomNewPassword = () => {
    
}

export const ListAllPasswords = () => {
    
}

export const FindPasswordByAppname = () => {
    
}