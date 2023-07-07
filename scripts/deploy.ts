import { ethers, upgrades } from "hardhat";

async function main() {
  //
  const CNStakingV2 = "0x6aF73c9Da47a7b6d8ba7F82f00BaCeddE953e839";
  const gcRewardAddress = "0x1716C4d49E9D81c17608CD9a45b1023ac9DF6c73";
  const rewardAddress = "0x1716C4d49E9D81c17608CD9a45b1023ac9DF6c73";
  const minKlayToOperate = ethers.utils.parseEther("1").toString();
  const nodeName = "Kommune";
  let tx;
  let receipt;

  // Treasury
  const treasury = await ethers.getContractFactory("Treasury");
  const Treasury = await upgrades.deployProxy(treasury, {
    initializer: "initialize",
  });
  await Treasury.deployed();
  console.log("Treasury deployed here", Treasury.address);

  // NodeManager
  const nodeManager = await ethers.getContractFactory("NodeManager");
  const NodeManager = await upgrades.deployProxy(
    nodeManager,
    [Treasury.address, minKlayToOperate],
    {
      initializer: "initialize",
    }
  );
  await NodeManager.deployed();
  console.log("NodeManager deployed here", NodeManager.address);

  // KoKlay
  const koKlay = await ethers.getContractFactory("KoKlay");
  const KoKlay = await upgrades.deployProxy(koKlay, [NodeManager.address], {
    initializer: "initialize",
  });
  await KoKlay.deployed();
  console.log("KoKlay deployed here", KoKlay.address);

  // NodeManager Transaction
  tx = await NodeManager.setStKlayAddress(KoKlay.address);
  receipt = await tx.wait();
  console.log("NodeManager setStKlayAddress : ", receipt);

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

  // NodeManager Transaction
  tx = await NodeManager.addNode(nodeName, NodeHandler.address, rewardAddress);
  receipt = await tx.wait();
  console.log("NodeManager addNode : ", receipt);

  // UnStakingReceiver Transaction
  tx = await UnstakingReceiver.setHandler(NodeHandler.address, true);
  receipt = await tx.wait();
  console.log("UnstakingReceiver setHandler : ", receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
