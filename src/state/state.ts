const State = {
    publicKey: '',
    master_pass: '',
    setPublicKey: (key:string) => {
        State.publicKey = key;
    },
    getPublicKey: () => State.publicKey,
    setMasterPass: (key:string) => {
        State.master_pass = key;
    },
    getMasterPass: () => State.master_pass,
}

export default State;