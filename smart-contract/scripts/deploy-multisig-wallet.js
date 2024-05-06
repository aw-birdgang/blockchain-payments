const { ethers} = require("hardhat");

async function main() {
    let [deployer] = await ethers.getSigners();
    const network = await ethers.provider.getNetwork()
    console.log(`chainId : ${network.chainId}) `)
    console.log('Deploying contracts with the account :', deployer.address);
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const wallet = await MultiSigWallet.deploy(
        ["0xOWNER1", "0xOWNER2", "0xOWNER3"], 2
    );
    await wallet.deployed();
    console.log("MultiSigWallet deployed to:", wallet.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
