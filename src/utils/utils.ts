import clipboard from 'clipboardy';
import chalk from "chalk";

export const printPassKeeperLists = (passKeeperList: Array<IPassKeeper>) => {
    console.log('\n');
    console.log(String("-".repeat(35)));

    if(passKeeperList.length === 1) {
        copyToClipboard(passKeeperList[0].password);
    }
    passKeeperList.map(item => {
        console.log(`App-name: ${chalk.blue(item.appname.charAt(0).toUpperCase() + item.appname.slice(1))}\nUser-name: ${item.username}\nEmail: ${item.email}\nPassword: ${chalk.bgBlue(item.password)}\t ${passKeeperList.length === 1 ? chalk.blueBright("copied to clipboard 📋") : ""}\n`);

    });
}

const isEven = (num:number) => num % 2 === 0;
const sorter = ((a:string, b:string) => {
   if(isEven(+a) && !isEven(+b)){
      return -1;
   };
   if(!isEven(+a) && isEven(+b)){
      return 1;
   };
   return +a - +b;
});

export const distributeStrIntoStr = (str:string, toBeDitrStr:string) => {
    return [...[...str], ...[...toBeDitrStr]].sort(sorter).join('');
}

export const copyToClipboard = (value:string) => {
    clipboard.writeSync(value);
}