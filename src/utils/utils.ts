export const printPassKeeperLists = (passKeeperList: Array<IPassKeeper>) => {
    console.log('\n');
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

export const distributeStrIntoStr = (str:string, toBeDitrStr:string) => {
    return [...[...str], ...[...toBeDitrStr]].sort(sorter).join('');
}

export const copyToClipboard = () => {
    //TODO (sohaib): To Implement copyToClipboard
}