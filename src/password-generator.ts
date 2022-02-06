import crypto from 'crypto';

export const generate = (length:number) => {

    const wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz()%~!@-#$';
    
    const password = Array.from(crypto.randomFillSync(new Uint32Array(length)))
        .map((x) => wishlist[x % wishlist.length])
        .join("");
    
    console.log(password);
}