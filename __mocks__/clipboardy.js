'use strict';

const clipboard = {};


function writeSync() {
  return "writeSync done";
}

clipboard.writeSync = writeSync;

module.exports = clipboard;