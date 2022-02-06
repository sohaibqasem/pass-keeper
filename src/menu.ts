import chalk from 'chalk';
import inquirer from 'inquirer';
//import { createSpinner } from 'nanospinner';

//const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    console.log(`
    ${chalk.bgBlue('Pass-Keeper')} 
    Passwords manager tool.

  `);
}

async function handleRequest(selected: string) {

    switch (selected) {
        case "Generate a new password":

            break;
        case "Custom new password":

            break;
        case "List all passwords":

            break;
        case "Find a password by (App name)":

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

async function mainMenu() {
    const answer = await inquirer.prompt({
        name: 'menu',
        type: 'list',
        prefix: '>',
        message: 'Choese from the following list...\n',
        choices: [
            'Generate a new password',
            'Custom new password',
            'List all passwords',
            'Find a password by (App name)',
        ],
    });

    return handleRequest(answer.menu);
}

export const start = () => {
    welcome();
    mainMenu();
}