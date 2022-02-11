import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { createSpinner, Spinner } from 'nanospinner';
import { CustomNewPassword, FindPasswordByAppname, GenerateNewPassword, ListAllPasswords } from './handlers';
//@ts-ignore (not included in types for figlet)
import Crawford from "figlet/importable-fonts/Crawford";

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

export const createLoadingSpinner = async (text:string, ms?:number) : Promise<Spinner> => {
    const spinner = createSpinner(text).start();
    await sleep(ms);
    return spinner;
}

async function handleRequest(selected: string) {

    switch (selected) {
        case "Generate a new password":
            await GenerateNewPassword();
            await mainMenu();
            break;
        case "Custom new password":
            await CustomNewPassword();
            await mainMenu();
            break;
        case "List all passwords":
            await ListAllPasswords();
            await mainMenu();
            break;
        case "Find a password by (App name)":
            await FindPasswordByAppname(await inquirerAppname());
            await mainMenu();
            break;
        default:
            break;
    }

    // const spinner = createSpinner('Loading...').start();
    // await sleep();

    // if (selected) {
    //     spinner.success({ text: `Nice work ${selected}.` });
    // } else {
    //     spinner.error({ text: `{"error"}!` });
    //     process.exit(0);
    // }
}

export function Logo() {
    figlet.parseFont("Crawford", Crawford);
    figlet('pass keeper', {
        font: 'Crawford',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
  }

export async function welcome(version: string) {
    console.log(`
   ${chalk.blue('Pass-Keeper')}, ${version}
   Passwords manager tool.

  `);
}

export async function setupMsg() {
    const spinner = await createLoadingSpinner(`Let us setup pass-keeper...`);
    try {
        spinner.success({ text: "Let us setup pass-keeper..." });
    }
    catch {
        spinner.error({ text: "Let us setup pass-keeper..." });
    }
}

export async function mainMenu() {
    const answer = await inquirer.prompt({
        name: 'menu',
        type: 'list',
        prefix: '',
        message: 'pass-keeper',
        choices: [
            'Generate a new password',
            'Custom new password',
            'List all passwords',
            'Find a password by (App name)',
        ],
    });

    return handleRequest(answer.menu);
}

export async function inquirerMasterPassword(): Promise<string> {
    const answer = await inquirer.prompt({
        name: 'masterPassword',
        type: 'password',
        prefix: '>',
        message: 'master password:',
    });

    return answer.masterPassword;
}

export async function inquirerAppname(): Promise<string> {
    const answer = await inquirer.prompt({
        name: 'appname',
        type: 'input',
        prefix: '>',
        message: 'app name:',
    });

    return answer.appname;
}