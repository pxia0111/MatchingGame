// const MemoryToken = artifacts.require("MemoryToken");
const Ranking = artifacts.require('Ranking.sol');
// const askPayment = artifacts.require("askPayment.sol");
// const checkReward = artifacts.require("checkReward.sol");
// const PurseTokenUpgradable = artifacts.require("PurseTokenUpgradable.sol")
const Token = artifacts.require("Token.sol")

const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

// function tokens(n) {
//   return web3.utils.toWei(n, 'ether');
// }

module.exports = async function(deployer, network, accounts) {
  if(network ==='rinkeby' || network ==='evmostestnet' || network ==='fxtestnet' || network ==='bsctest' || network ==='richardnet') {

    // const purseToken = await deployProxy(PurseTokenUpgradable,["0x2a9830c640d84fcea5df266cfeaa33428937f265", "0xA2993e1171520ba0fD0AB39224e1B24BDa5c24a9", 0, 0, 0],{deployer, kind: 'uups' });
        
    await deployer.deploy(Token)
    const token = await Token.deployed()
    console.log(token.address)
    // console.log('Purse done')
    // await purseToken.transfer("0x2a9830C640d84fCeA5DF266cfEaA33428937F265", tokens('500000000'))
    

    await deployer.deploy(Ranking, token.address)
    const ranking = await Ranking.deployed()
    console.log(ranking.address)
    await token.transfer(ranking.address, '500000000000000000000000')   
    await token.transfer("0x2a9830C640d84fCeA5DF266cfEaA33428937F265", '500000000000000000000000')
    console.log('Ranking deploy done')
    
    // await deployer.deploy(askPayment)
    // const paymentdone = await askPayment.deployed()
    // console.log('askPayment deploy done')

    // await deployer.deploy(checkReward)
    // const checkreward = await checkReward.deployed()
    // console.log('checkreward deploy done')
  }
};
