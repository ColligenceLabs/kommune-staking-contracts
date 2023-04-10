// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IUnstakingReceiver {
    function withdraw(address to) external;
}
