import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export const encrypt = (password: string) : IEncrypt => {
    const iv = Buffer.from(randomBytes(16));
    const cipher = createCipheriv(
        "aes-256-gcm",
        Buffer.from(process.env.ENCRYPT_KEY!!),
        iv
    );
    const encpass = Buffer.concat([cipher.update(password), cipher.final()]);
    return {
        iv: iv.toString("hex"),
        password: encpass.toString("hex"),
        tag: cipher.getAuthTag().toString("hex"),
    };
};

export const decrypt = (encpass: IEncrypt) => {
    const decipher = createDecipheriv(
        "aes-256-gcm",
        Buffer.from(process.env.ENCRYPT_KEY!!),
        Buffer.from(encpass.iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(encpass.tag, "hex"));
    const decpass = Buffer.concat([
        decipher.update(Buffer.from(encpass.password, "hex")),
        decipher.final(),
    ]);
    return decpass.toString();
};


interface IEncrypt {
    iv: string,
    password: string,
    tag: string,
}