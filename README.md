# Ethereum Open Transaction Insurance Market (EOTIM)

Proof of Concept for an p2p open market for insuring escrow based transactions on the blockchain. 

## Building

1. Clone repo

```
    $ git clone https://github.com/robertsimoes/Ethereum-Open-Transaction-Insurance-Market eotim
```

2. `cd eotim && npm install`
3. Start [`ganache-cli`](https://github.com/trufflesuite/ganache-cli)
4. Deploy contracts:
    run `truffle migrate --reset`
5. Start the server: 
    `npm run start`
6. Navigate over to http://localhost:3000
7. Make sure you have MetaMask
8. ???
9. Profit??? 

## View 

![2](/assets/eotim-ex-2.gif)

[View More](/assets/eotim-ex-1.gif)


## Extension Possibilities // TODOs

- [ ] Escalation of claims on transaction to disburse insurance back 🔥
- [ ] Proof of Goods Arrival // defaulting of payment to counter party 🔥
- [ ] Registry Contract with insured, owned, settled contracts for queries
- [ ] View my insured transactions view 🔥
- [ ] Better architecture with registry and action relayer
- [ ] Filtering market contracts 

## Author

[@RobertSimoes](www.robertsimoes.com)

## Technology

React, Redux, Truffle, Solidity

## License

This repository code is open sourced under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
