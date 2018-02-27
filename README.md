# Ethereum Open Transaction Insurance Market (EOTIM)

PoC for an p2p open market for insuring escrow based transactions on the blockchain. 

Let's say you're making a shipment from Mexico to Vancouver for oranges 📦🍊. 

You might want to have some insurance on that... 👨🏻‍

Okay probably not 🤦. But this was just a fun project to learn a little bit more about Truffle, Dapps and React.Js.

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
    run `truffle migrate --network testrpc --reset`
5. Start the server: 
    `npm run start`
6. Navigate over to http://localhost:3000
7. Make sure you have MetaMask
8. Input your `menomic` -> check testrpc
9. Make sure network on 8545 (testrpc)
10. ???
11. Profit??? 

## TODO
(It's a wip okay 😆)

1. Fix `insure` method to accurately insure contracts 
2. Fix insured flags to present non-insured contracts
3. Pull user's deal contracts on dashboard
4. Search by name for contracts

## Lé Gallerié 

![Home](/assets/home.png)
Home Landing Page

![Dashboard](/assets/dash.png)
Dashboard to display to users their offers

![Open](/assets/open.png) 
Blank home page

![offers](/assets/offers.png)
Offers currently out there fore me to insurer

![Trxn](/assets/trxn.png)
Transaction creation page

## Author

[@RobertSimoes](www.robertsimoes.com)

## Technology

React, Redux, Truffle, Solidity

## License

This repository code is open sourced under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
