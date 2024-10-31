/*
 * npx hardhat run --network < baobab | cypress > scripts/utils/getProxyAdmin.ts
 */

import { ethers, network, upgrades } from "hardhat";
import hre from "hardhat";
import { getManifestAdmin } from "@openzeppelin/hardhat-upgrades/dist/admin";
import {getProxyAdminFactory} from "@openzeppelin/hardhat-upgrades/src/utils";

async function main() {
  //
  // const owner = await ethers.getSigner(<string>network.config.from);
  // console.log("Deploy owner : ", owner.address);

  const KoKlay =
    network.config.chainId === 1001
      ? "0xb15782EFbC2034E366670599F3997f94c7333FF9"
      : "0xa1338309658d3da331c747518d0bb414031f22fd"; // "0x42D4a59785a477588e464ac7421c385619087911";

  // const Timelock =
  //   network.config.chainId === 1001
  //     ? "0xf5F71D90f605f1BAdA44ae60f59E59c21417Df57"
  //     : "0x2A77c5b935531b498cd42a796f0AA2D8497C5dD5";

  // const ProxyAdmin =
  //   network.config.chainId === 1001
  //     ? "0x01dD9d6eA32FB311e5ffbba7a3ab455B5b7ddF11"
  //     : "";

  let proxyAdmin = await upgrades.erc1967.getAdminAddress(KoKlay);
  console.log("Proxy Admin of KoKLAY     : ", proxyAdmin);

  const admin = await getManifestAdmin(hre);
  console.log("Manifest Admin            : ", admin.address);

  // await upgrades.admin.changeProxyAdmin(KoKlay, admin.address);
  // await admin.changeProxyAdmin(KoKlay, admin.address);

  // proxyAdmin = await upgrades.erc1967.getAdminAddress(
  //   "0xd62cBd965e32e1Fc20DDf0ACf386729B0945D9dE"
  // );
  // console.log("Proxy Admin of new KoKLAY : ", proxyAdmin);

  // const signer = await ethers.getSigner(<string>network.config.from);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
