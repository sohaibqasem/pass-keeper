'use strict';
import { encrypt, decrypt } from '../encryption';
import State from '../state/state';

describe('pass-keeper Encryption & Decryption', () => {

    const plainPassword = 'test123';
    let encPass = '';

    beforeAll(() => {
        State.setPublicKey('N8cC5wm(k5G8P0SAQqoC9vEERMwhyuvt');
        State.setMasterPass('testMasterPass');
        encPass = encrypt(plainPassword);
    });

    test('if plain Password is empity', () => {
      expect(encrypt('')).toEqual('');
    });
  
    test('if decrypt give the same value of plain text password', () => {
      expect(decrypt(encPass)).toEqual(plainPassword);
    });
  
  });