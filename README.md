# Ethereum Open Transaction Insurance Market (EOTIM)

Proof of Concept for an p2p open market for insuring escrow based transactions on the blockchain. 

## Hypothetical Scenario

Suppose `Party A` is a malevolent corporate competitor to `Party B` in the manufacturing industry. In the pursuit of total market domination, `Party A` attempts to grief `Party B` by increasing it's inventory loss and accounts receivables default rate by making multiple orders and withdrawing the payment at the last minute.

Being suspicious, `Party B` demands that it will only go through with the transaction if `Party A` creates an *insured* escrow transaction. In the event that `Party B` sends the goods, but `Party A` decides to default on the transaction, a third party `Party C` provides insurance up to the maximum value of the transaction to be paid out to `Party B` for inventory loss expenses.

If, however, the transaction goes through, `Party C` is paid a premium on the transaction value, for providing insurance services and absorbing risk.

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
