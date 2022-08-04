import { Wallet, WalletSchema } from '../../../models/Wallet';
const Wallets = [
    {
        accountId: 1,
        accountName: "Don",
        accountNumber: 1234958203,
        currency: 'naira',
        amount: 40000,
        createdAt: Date.now(),
        emailAddress: "jothamweb@gmail.com",
        pin: 5568,
    },
    {
        accountId: 1,
        accountName: "Don",
        accountNumber: 1234958203,
        currency: 'naira',
        amount: 50000,
        createdAt: Date.now(),
        emailAddress: "switzdigital@gmail.com",
        pin: 5568,
    },
    {
        accountId: 1,
        accountName: "Don",
        accountNumber: 1234958203,
        currency: 'naira',
        amount: 30000,
        createdAt: Date.now(),
        emailAddress: "jothamntekim@gmail.com",
        pin: 5568,
    },

];

exports.seedWallets = async () => {
        try{
            let WalletData = [];
            // Loop through the Wallets array
            for(let i = 0; i < Wallets.length; i++) {
                let email = Wallets[i].emailAddress;
                // check if the email from each Wallet object already exists
                // if yes, store in WalletData
                WalletData = await Wallet.find<WalletSchema>({email});
            };
            /*
             * check the number of items in WalletData array
             * if 0, then loop through the Wallets array and seed them, else already exists
             */
            if(WalletData.length == 0) {
                    Wallets.forEach(async (data) => {
                        await Wallet.create(data)
                        .then((pharm:any) => {
                                console.log("Wallets seeded succesfully", {pharm});
                            })
                            .catch((error:any) => {
                                console.log("Wallet already exists", {error});
                            });
                        });
                }else{
                    console.log("Wallet already exist");
                }  
        }catch (error) {
            console.log(error);
        }     
}
