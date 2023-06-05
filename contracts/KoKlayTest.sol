// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@klaytn/contracts/KIP/token/KIP7/IKIP7.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";

import "./library/KIP7Upgradeable.sol";
import "./interfaces/IStKlay.sol";
import "./interfaces/INodeManager.sol";

/**
 * @title StKlay Token Contract
 * @notice Stakes and unstakes KLAY <=> stKlay
 */
contract StKlayTest is
IKIP7,
KIP7Upgradeable
{
    event Stake(uint256);
    event Unstake(uint256);
    event Claim(address);

    function initialize()
    external
    initializer
    {
        __KIP7_init_unchained("Stake.ly Staked KLAY", "stKLAY");
    }

    receive() external payable {}

    function stake() external payable {
        emit Stake(msg.value);
    }

    function unstake(uint256 amount) external {
        emit Unstake(amount);
    }

    function claim(address user) external {
        emit Claim(user);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal override {
        super._approve(owner, spender, amount);
    }
}
