// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface ITreasury {
    struct WithdrawLog {
        uint256 timestamp;
        uint256 amount;
        address token;
        address from;
        address to;
        string comment;
    }

    function logCount() external view returns (uint256);

    function log(uint256 id)
    external
    view
    returns (
        uint256,
        uint256,
        address,
        address,
        address,
        string memory
    );

    function withdrawKlay(
        uint256 amount,
        address to,
        string calldata comment
    ) external;

    function withdrawToken(
        address tokenAddress,
        uint256 amount,
        address to,
        string calldata comment
    ) external;

    function getLog(uint256 pageSize, uint256 pageNum)
    external
    view
    returns (uint256, WithdrawLog[] memory);
}
