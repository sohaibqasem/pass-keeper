import crypto from 'crypto';

export const generate = (length:number) : string => {

    const wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz()%~!@-#$';
    
    const password = Array.from(crypto.randomFillSync(new Uint32Array(length)))
        .map((x) => wishlist[x % (wishlist.length-1)])
        .join("");
    
    return password;
}