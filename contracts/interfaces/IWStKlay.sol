// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@klaytn/contracts/KIP/token/KIP7/IKIP7.sol";

interface IWStKlay is IKIP7 {
    function wrap(uint256 amount) external returns (uint256 wrappedAmount);

    function unwrap(uint256 amount) external returns (uint256 unwrappedAmount);
}
