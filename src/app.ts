#! /usr/bin/env node
'use strict';

var { version } = require('../package.json');

import { welcome, mainMenu, Logo } from './menu';
import { program } from "commander";
import { setup } from './setup';

program.version(version);

program
    .option('--user <username>', "username")
    .option('--pass <password>', "password")
    .parse();

const options = program.opts<{ username: string, password: string }>();

// App flow
const start = async () => {
    await setup();
    console.clear();
    Logo();
    await welcome(version);
    await mainMenu();
}

start();