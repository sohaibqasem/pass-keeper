#! /usr/bin/env node
'use strict';

var { version } = require('../package.json');

import readWrite from './readWrite';
import { generate } from './password-generator';
import { welcome, inquirerMasterPassword, mainMenu, setupMsg } from './menu';

import { homedir } from "os";
import { program } from "commander";
import { existsSync, mkdirSync } from "fs";

program.version(version);

program
    .option('--user <username>', "username")
    .option('--pass <password>', "password")
    .parse();

const options = program.opts<{ username: string, password: string }>();

// global var
let master_pass: string = '';

// setup app
const setup = async () => {
    const dir = `${homedir()}/pass-keeper/`;
    if (existsSync(dir)) {
        master_pass = await inquirerMasterPassword();
        return;
    } else {
        mkdirSync(dir);
        await setupMsg();
        master_pass = await inquirerMasterPassword();
        if (master_pass) {
            readWrite.writeConfig({
                publicSecretKey: generate(32)
            });
            readWrite.writePassword([]);
        }
    }
}

// App flow
const start = async () => {
    await welcome(version);
    await setup();
    await mainMenu();
}

start();