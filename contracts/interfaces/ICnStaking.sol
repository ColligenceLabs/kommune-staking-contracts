// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface ICnStaking {
    function staking() external view returns (uint256);

    function withdrawalRequestCount() external view returns (uint256);

    /// @notice submit a request to withdraw staked KLAY (multi-sig operation).
    ///         7 days after "approveStakingWithdrawal" has been requested,
    ///         admins can call this function for actual withdrawal for another 7-day period.
    ///         If the admin doesn't withraw KLAY for that 7-day period, it expires.
    /// @param _to target address to receive KLAY
    /// @param _value withdrawl amount of KLAY
    function submitApproveStakingWithdrawal(address _to, uint256 _value)
    external;

    /// @notice stake KLAY
    function stakeKlay() external payable;
    function delegate() external payable;

    /// @notice 7 days after "approveStakingWithdrawal" has been requested, admins can call this function for actual withdrawal. However, it's only available for 7 days
    /// @param _approvedWithdrawalId the withdrawal ID to excute. The ID is acquired at the event log of ApproveStakingWithdrawal
    function withdrawApprovedStaking(uint256 _approvedWithdrawalId) external;

    /// @notice get details of approved staking withdrawal
    /// @param _index staking withdrawal ID
    /// @return withdrawal target address, wthdrawal KLAY value, time when it becomes available, withdrawal request state
    // function getApprovedStakingWithdrawalInfo(uint256 _index) external view returns(address, uint256, uint256, WithdrawalStakingState);
    function getApprovedStakingWithdrawalInfo(uint256 _index)
    external
    view
    returns (
        address,
        uint256,
        uint256,
        uint256
    );

    function getLockupStakingInfo()
    external
    view
    returns (
        uint256[] memory,
        uint256[] memory,
        uint256,
        uint256,
        uint256
    );
}
