#! /usr/bin/env node
'use strict';

import { program } from "commander";
import { generate } from './password-generator';

program.version('1.0.0');

program
    .option('--user <username>', "username")
    .option('--pass <password>', "password")
    .parse();

const options = program.opts<{ username:string, password:string }>();

generate(20);