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
    //TODO (sohaib): Decript password
    const DecriptedpassKeeperList = passKeeperList.map(item => {
        return {
            ...item,
            password: item.password     
        }
    });

    return DecriptedpassKeeperList;
}

export const copyToClipboard = () => {
    //TODO (sohaib): To Implement
}