const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {

    let buyer, seller, inspector, lender
    let realEstate, escrow

    it('Saves Address', async ()  => {

        [buyer, seller, inspector, lender] = await ethers.getSigners()


        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy();

        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        await transaction.wait();

        const Escrow = await ethers.getContractFactory('Escrow');
        escrow = await Escrow.deploy(
            realEstate.address,
            lender.address,
            seller.address,
            buyer.address
        );
    })

})
