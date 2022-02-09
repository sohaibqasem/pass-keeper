import { decrypt } from "../encription";

export const printPassKeeperLists = (passKeeperList: Array<IPassKeeper>) => {
    console.log(String("-".repeat(35)));

    passKeeperList.map(item => {
        console.log(`
        app-name: ${item.appname}
        user-name: ${item.username}
        email: ${item.email}
        password: ${item.password}
        `);

    });
}

export const decriptPasswordInPassKeeperLists = (passKeeperList: Array<IPassKeeper>): Array<IPassKeeper> => {
    const DecriptedpassKeeperList = passKeeperList.map(item => {
        return {
            ...item,
            password: decrypt(item.password)     
        }
    });

    return DecriptedpassKeeperList;
}

export const distributeStrIntoStr = (str:string, toBeDitrStr:string) => {
    return [...[...str], ...[...toBeDitrStr]].sort(sorter).join('');
}

const isEven = (num:any) => num % 2 === 0;
const sorter = ((a:any, b:any) => {
   if(isEven(a) && !isEven(b)){
      return -1;
   };
   if(!isEven(a) && isEven(b)){
      return 1;
   };
   return a - b;
});

export const copyToClipboard = () => {
    //TODO (sohaib): To Implement
}