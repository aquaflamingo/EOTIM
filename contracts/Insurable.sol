contract Insurable {
  address public insurer;
  uint public locked_coverage;

  function Insurable() {

  }

  modifier onlyInsurer() {
    if (msg.sender == insurer)
      _;
  }

  function transferOwnership(address newOwner) onlyInsurer {
    if (newOwner != address(0)) {
        insurer = newOwner;
    }
  }

    function insure() payable {
        // Cannot over insure an escrow contract beyond coverage set
        // require(this.insurance_coverage<=msg.value);
        if (insurer==msg.sender) {
            locked_coverage = msg.value;
        }
    }

}
