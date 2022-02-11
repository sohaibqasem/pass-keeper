'use strict';
import { generate } from '../password-generator';

describe('pass-keeper global password-generator', () => {

    let password = '';

    beforeAll(() => {
        password = generate(20);
    });

    test('is the generated password length correct', () => {
        expect(password.length).toEqual(20);
    });

    test('is the generated password unique', () => {
        expect(password).not.toEqual(generate(20));
    });

});