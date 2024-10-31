/*
 * npx hardhat run --network < baobab | cypress > scripts/utils/owner.ts
 */

import { ethers, network, upgrades } from "hardhat";

/*
 * TODO : Change the Owner of ProxyAdmin contract
 */

async function main() {
  const owner = await ethers.getSigner(<string>network.config.from);
  console.log(">> owner : ", owner.address);

  const proxyAdmin = await upgrades.deployProxyAdmin(owner);
  console.log(">> proxyAdmin : ", proxyAdmin);

  // await upgrades.admin.transferProxyAdminOwnership(
  //   "0xc88a8dDd9E56cC6a26404B6c412f2FCF290BdE3D"
  // );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
