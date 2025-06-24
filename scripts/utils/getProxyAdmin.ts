/*
 * npx hardhat run --network < baobab | cypress > scripts/utils/getProxyAdmin.ts
 */

import { ethers, network, upgrades } from "hardhat";
import hre from "hardhat";
import { getManifestAdmin } from "@openzeppelin/hardhat-upgrades/dist/admin";
import {getProxyAdminFactory} from "@openzeppelin/hardhat-upgrades/src/utils";
import {getAdminAddress} from "@openzeppelin/upgrades-core";

async function main() {
  //
  // const owner = await ethers.getSigner(<string>network.config.from);
  // console.log("Deploy owner : ", owner.address);

  const KoKlay =
    network.config.chainId === 1001
      ? "0xb15782EFbC2034E366670599F3997f94c7333FF9"
      : "0xa1338309658d3da331c747518d0bb414031f22fd"; // "0x42D4a59785a477588e464ac7421c385619087911";

  const wKoKlay =
      network.config.chainId === 1001
          ? "0xE019c5f1dDAF64A30d7d0B036b746aCbD4Aa8Af8" // "0xA5290a54b74b423f062c95e4f4406B2F87Cc8aba"
          : "0xdEC2Cc84f0a37Ef917f63212FE8ba7494b0E4B15";

  const treasury =
      network.config.chainId === 1001
          ? "0x108A2BaE876d09a6DF2a84CD69F1c3511871435e"
          : "0xFBf389be9EF4cEd3a95bDC2A6fC94B81c8E374A3";


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

  proxyAdmin = await upgrades.erc1967.getAdminAddress(wKoKlay);
  console.log("Proxy Admin of wKoKlay     : ", proxyAdmin);

  proxyAdmin = await upgrades.erc1967.getAdminAddress(treasury);
  console.log("Proxy Admin of treasury     : ", proxyAdmin);

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
