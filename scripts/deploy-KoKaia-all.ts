/*
 * npx hardhat run --network < baobab | cypress > scripts/deploy.ts
 */

import { ethers, upgrades, network } from "hardhat";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  //
  const CNStakingV2 =
      network.config.chainId === 1001
          ? "0xb4B58E8d863C64CD0A55A776ea0fba35efB5b44C" // "0x071153F1C30af607b86443dA6cb90451101b57Fa" // "0x6aF73c9Da47a7b6d8ba7F82f00BaCeddE953e839"
          : "0x2b7894a774ad6d2bcb871edf4edb9c882ecfcfdd"; // for Kommune DAO
  const C2Node =
      network.config.chainId === 1001
          ? "0xb4B58E8d863C64CD0A55A776ea0fba35efB5b44C" // "0x071153F1C30af607b86443dA6cb90451101b57Fa" // "0x6aF73c9Da47a7b6d8ba7F82f00BaCeddE953e839"
          : "0x938b3c69ad69d7ac0d872178f5fd45868784c90d"; // 5M initial lockup by Foundation
  const gcRewardAddress =
      network.config.chainId === 1001
          ? "0x1716C4d49E9D81c17608CD9a45b1023ac9DF6c73"
          : "0x1688b716de237c88835149f310b61a8e2bee0d4b";
  const minKlayToOperate = ethers.utils.parseEther("1").toString();
  const nodeName = "Kommune DAO";
  const delay = 2 * 24 * 3600; // 2 days
  const multisig =
      network.config.chainId === 1001
          ? "0x9015fe6Ade4CA2456C0235c14a868bc95037A9A2" // "0x4aac3447EeB53e14Fd56c8c5842E02Bc07184c5F"
          : "0xf6C49616E680B42d36457D5aD202880a01AA85e1";

  let tx;
  let receipt;

  const owner = await ethers.getSigner(<string>network.config.from);
  console.log(">> Deploy owner : ", owner.address);

  // Timerlock V2
  const timelock = await ethers.getContractFactory("TimelockV2");
  const Timelock = await timelock.deploy(multisig, delay);
  await Timelock.deployed();
  console.log("Timelock V2 deployed here", Timelock.address);

  // Treasury
  await sleep(2000);
  const treasury = await ethers.getContractFactory("Treasury");
  const Treasury = await upgrades.deployProxy(treasury, {
    initializer: "initialize",
  });
  await Treasury.deployed();
  console.log("Treasury deployed here", Treasury.address);

  await sleep(2000);
  await upgrades.admin.changeProxyAdmin(
      Treasury.address,
      Timelock.address
      // owner
  );
  // console.log("changeProxyAdmin : ", Treasury.address, Timelock.address);

  const rewardAddress =
      network.config.chainId === 1001 ? gcRewardAddress : Treasury.address;

  // NodeManager
  await sleep(2000);
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

  await sleep(2000);
  await upgrades.admin.changeProxyAdmin(NodeManager.address, Timelock.address);
  // console.log("changeProxyAdmin : ", NodeManager.address, Timelock.address);

  // KoKaia
  await sleep(2000);
  const koKaia = await ethers.getContractFactory("KoKaia");
  const KoKaia = await upgrades.deployProxy(
      koKaia,
      [NodeManager.address, Timelock.address],
      {
        initializer: "initialize",
      }
  );
  await KoKaia.deployed();
  console.log("KoKaia deployed here", KoKaia.address);

  await sleep(2000);
  await upgrades.admin.changeProxyAdmin(KoKlay.address, Timelock.address);
  // console.log("changeProxyAdmin : ", KoKlay.address, Timelock.address);

  // NodeManager Transaction
  await sleep(2000);
  tx = await NodeManager.setStKlayAddress(KoKaia.address);
  receipt = await tx.wait();
  console.log("NodeManager setStKlayAddress : ", receipt.transactionHash);

  // UnStakingReceiver
  await sleep(2000);
  const unstakingReceiver = await ethers.getContractFactory(
      "UnstakingReceiver"
  );
  const UnstakingReceiver = await unstakingReceiver.deploy();
  await UnstakingReceiver.deployed();
  console.log("UnstakingReceiver deployed here", UnstakingReceiver.address);

  // NodeHandler
  await sleep(2000);
  const nodeHandler = await ethers.getContractFactory("NodeHandlerV2");
  const NodeHandler = await upgrades.deployProxy(
      nodeHandler,
      [
        CNStakingV2,
        C2Node,
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

  await sleep(2000);
  await upgrades.admin.changeProxyAdmin(NodeHandler.address, Timelock.address);
  // console.log("changeProxyAdmin : ", NodeHandler.address, Timelock.address);

  // NodeManager Transaction
  await sleep(2000);
  tx = await NodeManager.addNode(nodeName, NodeHandler.address, rewardAddress);
  receipt = await tx.wait();
  console.log("NodeManager addNode : ", receipt.transactionHash);

  // UnStakingReceiver Transaction
  await sleep(2000);
  tx = await UnstakingReceiver.setHandler(NodeHandler.address, true);
  receipt = await tx.wait();
  console.log("UnstakingReceiver setHandler : ", receipt.transactionHash);

  // WKoKlay
  await sleep(2000);
  const wkoKlay = await ethers.getContractFactory("WKoKlay");
  const WKoKlay = await upgrades.deployProxy(wkoKlay, [KoKaia.address], {
    initializer: "initialize",
  });
  await WKoKlay.deployed();
  console.log("WKoKlay deployed here", WKoKlay.address);

  await sleep(2000);
  await upgrades.admin.changeProxyAdmin(WKoKlay.address, Timelock.address);
  // console.log("changeProxyAdmin : ", WKoKlay.address, Timelock.address);

  // Revoke Roles from NodeManager
  // tx = await NodeManager.revokeRoles();
  // receipt = await tx.wait();
  // console.log("NodeManager revokeRoles : ", receipt.transactionHash);

  // Transfer Ownerships to multisig wallet
  await sleep(2000);
  tx = await Treasury.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("Treasury transferOwnership : ", receipt.transactionHash);

  await sleep(2000);
  tx = await NodeManager.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("NodeManager transferOwnership : ", receipt.transactionHash);

  // tx = await KoKaia.transferOwnership(Timelock.address);
  // receipt = await tx.wait();
  // console.log("KoKaia transferOwnership : ", receipt.transactionHash);

  await sleep(2000);
  tx = await UnstakingReceiver.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log(
      "UnstakingReceiver transferOwnership : ",
      receipt.transactionHash
  );

  await sleep(2000);
  tx = await NodeHandler.transferOwnership(Timelock.address);
  receipt = await tx.wait();
  console.log("NodeHandler transferOwnership : ", receipt.transactionHash);

  // tx = await WKoKlay.transferOwnership(Timelock.address);
  // receipt = await tx.wait();
  // console.log("WKoKlay transferOwnership : ", receipt.transactionHash);

  // tx = await Timelock.transferOwnership(Timelock.address);
  // receipt = await tx.wait();
  // console.log("Timelock transferOwnership : ", receipt.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
