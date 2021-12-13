// const MemoryToken = artifacts.require("MemoryToken");
const Ranking = artifacts.require('Ranking.sol');

module.exports = async function(deployer, network, accounts) {
  if(network ==='rinkeby') {

    await deployer.deploy(Ranking)
    const ranking = await Ranking.deployed()
  
  
  console.log('deploy done')
  }
};
