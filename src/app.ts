#! /usr/bin/env node
'use strict';

var { version } = require('../package.json');

import { welcome, mainMenu, Logo, handleRequest } from './menu';
import { program } from "commander";
import { setup } from './setup';

program.version(version);

program
    .argument('[appname]', 'app-name you want to search for')
    .argument('[password]', 'master-password')
    .showHelpAfterError('(add --help for additional information)')
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