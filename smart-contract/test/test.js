const { expect } = require('chai')

describe("BirdgangToken", function() {
    it("should return correct name and symbol", async function () {
        const BirdgangToken = await hre.ethers.getContractFactory("BirdgangToken");
        const myContractDeployed = await BirdgangToken.deploy("BirdgangToken", "BGT");

        await myContractDeployed.deployed();

        expect(await myContractDeployed.name()).to.equal("BirdgangToken");
        expect(await myContractDeployed.symbol()).to.equal("BGT");
    });
});