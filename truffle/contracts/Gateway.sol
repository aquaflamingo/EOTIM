pragma solidity 0.5.0;

import "./TransactionRegistry.sol";

contract Gateway {
    TransactionRegistry internal registry;

    constructor(TransactionRegistry _registry) public {
        registry = _registry;
    }

    function execClaim(address _transaction, string calldata _ipfsHashptr) external returns (bool _success) {
        // Begin claims process
        // TODO
    }

    function insure(address payable _targetTransaction, address payable _insurer) external payable returns (bool _success) {
        // Begin insurance process
        // TODO

        // Contingent on success
        registry.registerInsurer(_targetTransaction, _insurer);
        return true;
    }

    function verifyOwnership(address payable _targetTransaction, address payable _owner) external returns (bool _success) {
        // Begin ownership verification process
        // TODO

        // Contingent on success
        registry.registerOwnership(_targetTransaction, _owner);
        return true;
    }
}