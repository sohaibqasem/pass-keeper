'use strict';
import State from '../state/state'

describe('pass-keeper global state', () => {

  test('is created empity', () => {
    expect(State.getPublicKey()).toEqual('');
    expect(State.getMasterPass()).toEqual('');
  });

  test('public key stored in the state', () => {
    State.setPublicKey('public key');
    expect(State.getPublicKey()).toEqual('public key');
  });

  test('master password stored in the state', () => {
    State.setMasterPass('master password');
    expect(State.getMasterPass()).toEqual('master password');
  });

});