module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "1" // Match any network id
   },
   testrpc: {
    host: "localhost",
    port: 8545,
    network_id: "2" 
   }
  }
};
