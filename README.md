# Ethereum Open Transaction Insurance Market (EOTIM)

Proof of Concept for an p2p open market for insuring escrow based transactions on the blockchain. 

## Building

1. Clone repo

```
    $ git clone https://github.com/robertsimoes/Ethereum-Open-Transaction-Insurance-Market eotim
```

2. `cd eotim && npm install`
3. Download testrpc
4. Start Local Ethereum instance: 
    run `testrpc`
5. Deploy contracts:
    run `truffle migrate --reset`
5. Start the server: 
    `npm run start`
6. Navigate over to http://localhost:3000
7. Make sure you have MetaMask
8. Input your `menomic` -> check testrpc
9. Make sure network on 8545 (testrpc)
10. ???
11. Profit??? 

## TODO

- [x] Fix `insure` method to accurately insure contracts 
- [x] Fix insured flags to present non-insured contracts
- [ ] Pull user's deal contracts on dashboard // BUG 🐞
    - [ ] Explore Remix Execution of Contract
    - [ ] Port to `ethereumProvider`?
- [x] Search for contracts

## View 

![2](/assets/eotim-ex-2.gif)

[View More](/assets/eotim-ex-1.gif)

## Author

[@RobertSimoes](www.robertsimoes.com)

## Technology

React, Redux, Truffle, Solidity

## License

This repository code is open sourced under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
