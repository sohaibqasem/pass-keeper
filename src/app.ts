#! /usr/bin/env node
'use strict';

var { version } = require('../package.json');

import { welcome, mainMenu, Logo } from './menu';
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
    await mainMenu(appname);
}

start();