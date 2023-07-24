// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./INodeHandler.sol";

interface INodeManager {
    enum ClaimState {
        Unclaimed,
        Claimed,
        Expired
    }

    struct NodeInfo {
        string name;
        bool active;
        INodeHandler nodeHandler;
        address rewardAddress;
    }

    struct FeeDistribution {
        uint8 operatorsRatio;
        uint8 treasuryRatio;
    }

    struct UnstakingRequest {
        uint256 amount;
        uint256 claimableTimestamp;
        ClaimState claimState;
    }

    function nodeCount() external view returns (uint256);

    function activeNodeCount() external view returns (uint256);

    function feeRate() external view returns (uint16);

    function feeDistribution()
    external
    view
    returns (
        uint8 operatorsRatio,
        uint8 treasuryRatio
    );

    function claimMinimum() external view returns (uint256);

    function distributeMinimum() external view returns (uint256);

    function distributeReward() external;

    function stake(address from) external payable returns (bool);

    function unstake(address to, uint256 amount) external returns (bool);

    function claim(address user)
    external
    returns (uint256 claimed, uint256 expired);

    function unstakeForRebalacing(uint256 nodeId, uint256 amount) external;

    function unstakeForDeregister(uint256 nodeId) external;

    function claimAndRestake(uint256 claimNodeId, uint256 stakeNodeId) external;

    function setStKlayAddress(address stKlayAddress) external;

    function setFeeRate(uint16 feeRate_) external;

    function setFeeDistribution(
        uint8 operatorsRatio_,
        uint8 treasuryRatio_
    ) external;

    function config(bytes32 what, uint256 data) external;

    function addNode(
        string calldata name,
        address nodeHandlerAddress,
        address rewardAddress
    ) external returns (uint256 nodeId);

    function setNodeName(uint256 nodeId, string calldata name) external;

    function setNodeActive(uint256 nodeId, bool active) external;

    function setNodeRewardAddress(uint256 nodeId, address rewardAddress)
    external;

    function setTreasuryAddress(address treasuryAddress) external;

    function getNode(uint256 nodeId)
    external
    view
    returns (NodeInfo memory info);

    function getTotalClaimable(address user)
    external
    view
    returns (uint256 claimable);

    function getClaimableRequestCount(address user)
    external
    view
    returns (uint256 count);

    function getUnstakingRequestsByPage(
        address user,
        uint256 pageSize,
        uint256 pageNum
    )
    external
    view
    returns (uint256 totalPages, UnstakingRequest[] memory requestedPage);
}
