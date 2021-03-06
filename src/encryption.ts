import State from './state/state';
import { distributeStrIntoStr } from "./utils/utils";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

export const encrypt = (password: string) => {
  if (password === '') return '';
  const iv = Buffer.from(randomBytes(16));

  const cipher = createCipheriv(
    "aes-256-gcm",
    Buffer.from(calcSecretKey(State.getMasterPass())),
    iv
  );

  const encpass = Buffer.concat([cipher.update(password), cipher.final()]);

  return [
    iv.toString("hex"),
    encpass.toString("hex"),
    cipher.getAuthTag().toString("hex"),
  ].join('|');
};

export const decrypt = (decpass: string) => {
  const [iv, encrypted, tag] = decpass.split("|");

  const decipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(calcSecretKey(State.getMasterPass())),
    Buffer.from(iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(tag, "hex"));

  const password = Buffer.concat([
    decipher.update(Buffer.from(encrypted, "hex")),
    decipher.final(),
  ]);

  return password.toString();
};

export const decryptPasswordInPassKeeperLists = (passKeeperList: Array<IPassKeeper>): Array<IPassKeeper> => {
  const DecriptedpassKeeperList = passKeeperList.map(item => {
    return {
      ...item,
      password: decrypt(item.password)
    }
  });

  return DecriptedpassKeeperList;
}

export const tryLogIn = (passKeeper: IPassKeeper): boolean => {
  if (passKeeper) {
    const DecriptedpassKeeperItem = decrypt(passKeeper.password);
    return DecriptedpassKeeperItem ? true : false;
  }

  return false;
}

export const calcSecretKey = (masterKey: string): string => {
  return createHash('sha256').update(distributeStrIntoStr(State.getPublicKey(), masterKey)).digest('hex').substring(0, 32);
}