#! /usr/bin/env node
'use strict';

var { version } = require('../package.json');

import State from './state/state';
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

// setup app
const setup = async () => {
    const dir = `${homedir()}/pass-keeper/`;
    if (existsSync(dir)) {
        State.setMasterPass(await inquirerMasterPassword());
        const config = readWrite.readConfig();
        State.setPublicKey(config?.publicSecretKey!!);
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

// App flow
const start = async () => {
    await welcome(version);
    await setup();
    console.log("pKey", State.getPublicKey());
    await mainMenu();
}

start();