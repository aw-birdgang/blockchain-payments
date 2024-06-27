// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());

    const owners = [
        "0xYourOwnerAddress1",
        "0xYourOwnerAddress2",
        "0xYourOwnerAddress3"
    ];
    const numConfirmationsRequired = 2;

    const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
    const multiSigWallet = await MultiSigWallet.deploy(owners, numConfirmationsRequired);

    await multiSigWallet.deployed();

    console.log("MultiSigWallet deployed to:", multiSigWallet.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
