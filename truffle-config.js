require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    // contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/e4d4bd63d38d414c8e9f280b70c6a830`),
            network_id: 4, // Ropsten's id
            gas: 5500000, // Ropsten has a lower block limit than mainnet
            confirmations: 2, // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
        }
        
        },
        
        contracts_directory: './src/contracts/',
        contracts_build_directory: './src/abis/',
        compilers: {

            solc: {
                version: "0.8.0",
                settings: {

                    optimizer: {
                        enabled: true,
                        runs: 200
                    },
                    evmVersion: "petersburg"
                }
            }
        }
    };
