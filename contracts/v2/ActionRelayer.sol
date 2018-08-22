pragma solidity ^0.4.24;

import "./TransactionRegistry.sol";

contract ActionRelayer {
    TransactionRegistry registry;

    constructor(TransactionRegistry _registry) {
        registry = _registry;
    }

    function relayClaim(address _transaction, string _ipfsHashptr) external returns (bool _success) {
        // Begin claims process
        // TODO
    }

    function relayInsure(address _targetTransaction, address _insurer) external payable returns (bool _success) {
        // Begin insurance process
        // TODO

        // Contingent on success
        registry.registerInsurer(_targetTransaction, _insurer);
        return true;
    }

    function relayOwnership(address _targetTransaction, address _owner) external returns (bool _success) {
        // Begin ownership verification process
        // TODO

        // Contingent on success
        registry.registerOwnership(_targetTransaction, _owner);
        return true;
    }




}