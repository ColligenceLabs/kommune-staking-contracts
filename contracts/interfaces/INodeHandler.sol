// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface INodeHandler {
    struct UnstakingInfo {
        uint256 id;
        uint256 amount;
        uint256 claimableTimestamp;
    }

    function gcStaking() external view returns (uint256);

    function gcReward() external view returns (uint256);

    function protocolStaking() external view returns (uint256);

    function protocolReward() external view returns (uint256);

    function unstakingRequested() external view returns (uint256);

    function gcRewardAddress() external view returns (address);

    function nodeManagerAddress() external view returns (address);

    function userToUnstakingData(address user, uint256 unstakeCount)
    external
    view
    returns (
        uint256,
        uint256,
        uint256
    );

    function unstakeCount(address user) external view returns (uint256);

    function claimCount(address user) external view returns (uint256);

    function stake() external payable;

    function unstake(address user, uint256 amount) external returns (uint256);

    function unstakeForDeregister() external;

    function claimUnstaked(address user, uint256 timeLimit)
    external
    returns (uint256 totalClaimed, uint256 expired);

    function claimReward() external returns (uint256);

    function updateGcStakedAmount() external;

    function setGcRewardAddress(address gcRewardAddress_) external;

    function setNodeManagerAddress(address nodeManagerAddress_) external;

    function nodeAddress() external view returns (address);

    function getUserUnstakingCount(address user)
    external
    view
    returns (uint256);

    function getClaimableReward() external view returns (uint256);

    function totalStaking() external view returns (uint256);

    function totalNetStaking() external view returns (uint256);

    function totalReward() external view returns (uint256);

    function protocolNetStaking() external view returns (uint256);
}
