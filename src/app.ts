#! /usr/bin/env node
'use strict';

import { program } from "commander";
import { generate } from './password-generator';
import { start, inquirerMasterPassword, mainMenu, setupMsg } from './menu';
import readWrite from './readWrite';
import { existsSync, mkdirSync } from "fs";
import { homedir } from "os";

program.version('1.0.0');

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
start();
setup();