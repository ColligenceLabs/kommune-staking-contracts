pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UnstakingReceiver is Ownable {
    using Address for address payable;

    mapping(address => bool) private isNodeHandler;

    event SetHandler(address, bool);
    event Withdraw(address, uint256);

    constructor() {}

    receive() external payable {}

    function setHandler(address handler, bool isNodeHandler_)
        external
        onlyOwner
    {
        isNodeHandler[handler] = isNodeHandler_;
        emit SetHandler(handler, isNodeHandler_);
    }

    function withdraw(address to) external {
        require(
            isNodeHandler[msg.sender],
            "UnstakingReceiver:: Not nodeHandler"
        );
        require(to != address(0), "Invalid recipient address");
        uint256 amount = address(this).balance;
        if (amount > 0) payable(to).sendValue(amount);
        emit Withdraw(to, amount);
    }
}
