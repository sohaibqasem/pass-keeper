'use strict';

const path = require('path');

const os = jest.createMockFromModule('os');


function homedir() {
  return "path/";
}

os.homedir = homedir;

module.exports = os;