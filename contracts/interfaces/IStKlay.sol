// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@klaytn/contracts/KIP/token/KIP7/IKIP7.sol";

interface IStKlay is IKIP7 {
    function totalShares() external view returns (uint256);

    function totalStaking() external view returns (uint256);

    function totalRestaked() external view returns (uint256);

    function stake() external payable;

    function stakeFor(address recipient) external payable;

    function unstake(uint256 amount) external;

    function claim(address user) external;

    function increaseTotalStaking(uint256 amount) external;

    function getSharesByKlay(uint256 amount) external view returns (uint256);

    function protectedGetSharesByKlay(uint256 amount) external view returns (uint256);

    function getKlayByShares(uint256 amount) external view returns (uint256);

    function protectedGetKlayByShares(uint256 amount) external view returns (uint256);

    function sharesOf(address user) external view returns (uint256);
}
