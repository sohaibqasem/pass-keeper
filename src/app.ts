#! /usr/bin/env node
'use strict';

var { version } = require('../package.json');

import { welcome, mainMenu, Logo, handleRequest } from './menu';
import { program } from "commander";
import { setup } from './setup';

program.version(version);

program
    .arguments('[appname] [password]')
    .parse();

const [ appname, password ] = program.args;

// App flow
const start = async () => {
    await setup(password);
    console.clear();
    Logo();
    await welcome(version);
    if(appname) {
        await handleRequest("Find a password by (App name)", appname);
    } else {
        await mainMenu();
    }
}

start();