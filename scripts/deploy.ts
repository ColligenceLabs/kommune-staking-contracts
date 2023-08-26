/*
 * npx hardhat run --network < baobab | cypress > scripts/deploy.ts
 */

import { ethers, upgrades, network } from "hardhat";

async function main() {
  //
  const CNStakingV2 = "0x6aF73c9Da47a7b6d8ba7F82f00BaCeddE953e839";
  const gcRewardAddress = "0x1716C4d49E9D81c17608CD9a45b1023ac9DF6c73";
  const rewardAddress = "0x1716C4d49E9D81c17608CD9a45b1023ac9DF6c73";
  const minKlayToOperate = ethers.utils.parseEther("1").toString();
  const nodeName = "Kommune";
  const delay = 2 * 24 * 3600; // 2 days
  // const multisig =
  //   network.config.chainId === 1001
  //     ? "0x4aac3447EeB53e14Fd56c8c5842E02Bc07184c5F"
  //     : "0xf6C49616E680B42d36457D5aD202880a01AA85e1";
  const multisig = "0x9015fe6Ade4CA2456C0235c14a868bc95037A9A2"; // Peter's Test
  let tx;
  let receipt;

  // Timerlock V2
  const timelock = await ethers.getContractFactory("TimelockV2");
  const Timelock = await timelock.deploy(multisig, delay);
  await Timelock.deployed();
  console.log("Timelock V2 deployed here", Timelock.address);

  // Treasury
  const treasury = await ethers.getContractFactory("Treasury");
  const Treasury = await upgrades.deployProxy(treasury, {
    initializer: "initialize",
  });
  await Treasury.deployed();
  console.log("Treasury deployed here", Treasury.address);
  await upgrades.admin.changeProxyAdmin(Treasury.address, Timelock.address);

  // NodeManager
  const nodeManager = await ethers.getContractFactory("NodeManager");
  const NodeManager = await upgrades.deployProxy(
    nodeManager,
    [Treasury.address, minKlayToOperate, Timelock.address],
    {
      initializer: "initialize",
    }
  );
  await NodeManager.deployed();
  console.log("NodeManager deployed here", NodeManager.address);
  await upgrades.admin.changeProxyAdmin(NodeManager.address, Timelock.address);

  // KoKlay
  const koKlay = await ethers.getContractFactory("KoKlay");
  const KoKlay = await upgrades.deployProxy(
    koKlay,
    [NodeManager.address, Timelock.address],
    {
      initializer: "initialize",
    }
  );
  await KoKlay.deployed();
  console.log("KoKlay deployed here", KoKlay.address);
  await upgrades.admin.changeProxyAdmin(KoKlay.address, Timelock.address);

  // NodeManager Transaction
  tx = await NodeManager.setStKlayAddress(KoKlay.address);
  receipt = await tx.wait();
  console.log("NodeManager setStKlayAddress : ", receipt.transactionHash);

  // UnStakingReceiver
  const unstakingReceiver = await ethers.getContractFactory(
    "UnstakingReceiver"
  );
  const UnstakingReceiver = await unstakingReceiver.deploy();
  await UnstakingReceiver.deployed();
  console.log("UnstakingReceiver deployed here", UnstakingReceiver.address);

  // NodeHandler
  const nodeHandler = await ethers.getContractFactory("NodeHandler");
  const NodeHandler = await upgrades.deployProxy(
    nodeHandler,
    [
      CNStakingV2,
      gcRewardAddress,
      NodeManager.address,
      UnstakingReceiver.address,
    ],
    {
      initializer: "initialize",
    }
  );
  await NodeHandler.deployed();
  console.log("NodeHandler deployed here", NodeHandler.address);
  await upgrades.admin.changeProxyAdmin(NodeHandler.address, Timelock.address);

  // NodeManager Transaction
  tx = await NodeManager.addNode(nodeName, NodeHandler.address, rewardAddress);
  receipt = await tx.wait();
  console.log("NodeManager addNode : ", receipt.transactionHash);

  // UnStakingReceiver Transaction
  tx = await UnstakingReceiver.setHandler(NodeHandler.address, true);
  receipt = await tx.wait();
  console.log("UnstakingReceiver setHandler : ", receipt.transactionHash);

  // WKoKlay
  const wkoKlay = await ethers.getContractFactory("WKoKlay");
  const WKoKlay = await upgrades.deployProxy(wkoKlay, [KoKlay.address], {
    initializer: "initialize",
  });
  await WKoKlay.deployed();
  console.log("WKoKlay deployed here", WKoKlay.address);
  await upgrades.admin.changeProxyAdmin(WKoKlay.address, Timelock.address);

  // Revoke Roles from NodeManager
  // tx = await NodeManager.revokeRoles();
  // receipt = await tx.wait();
  // console.log("NodeManager revokeRoles : ", receipt.transactionHash);

  // Transfer Ownerships to multisig wallet
  tx = await Treasury.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("Treasury transferOwnership : ", receipt.transactionHash);

  tx = await NodeManager.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("NodeManager transferOwnership : ", receipt.transactionHash);

  tx = await KoKlay.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("KoKlay transferOwnership : ", receipt.transactionHash);

  tx = await UnstakingReceiver.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log(
    "UnstakingReceiver transferOwnership : ",
    receipt.transactionHash
  );

  tx = await NodeHandler.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("NodeHandler transferOwnership : ", receipt.transactionHash);

  tx = await WKoKlay.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("WKoKlay transferOwnership : ", receipt.transactionHash);

  tx = await Timelock.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("Timelock transferOwnership : ", receipt.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
