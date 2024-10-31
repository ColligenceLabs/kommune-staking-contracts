/*
 * npx hardhat run --network < baobab | cypress > scripts/upgrade_KoKAIA.ts
 */

import { network } from "hardhat";

const { ethers, upgrades } = require("hardhat");

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const Timelock = network.config.chainId === 1001
      ? '0xf5F71D90f605f1BAdA44ae60f59E59c21417Df57'
      : '0x2A77c5b935531b498cd42a796f0AA2D8497C5dD5'
  const KoKlay =
    network.config.chainId === 1001
      ? "0xb15782EFbC2034E366670599F3997f94c7333FF9" // "0xd62cBd965e32e1Fc20DDf0ACf386729B0945D9dE"
      : "0xa1338309658d3da331c747518d0bb414031f22fd"; // "0x42D4a59785a477588e464ac7421c385619087911";

  // TODO : 이게 필요한 경우는 언제일까 ?
  const KoKlayFactory = await ethers.getContractFactory("KoKlay");
  const koKlay = await upgrades.forceImport(KoKlay, KoKlayFactory, { kind: 'transparent' });
  console.log("koKLAY total supply : " + await koKlay.totalSupply());

  const koKaia = await ethers.getContractFactory("KoKaiaV2");

  console.log("Upgrading KoKlay...");

  // const KoKaia = await upgrades.upgradeProxy(KoKlay, koKaia);
  const KoKaia = await upgrades.upgradeProxy(KoKlay, koKaia, {
    call: {
      fn: "setTicker",
      args: [],
    },
  })

  console.log("KoKlay upgraded to KoKaia = ", KoKaia.address);
  console.log(
    await upgrades.erc1967.getAdminAddress(KoKaia.address),
    "Proxy Admin"
  );

  // 1. Check the result of the upgrading
  // 2. run a script to changeProxyAdmin to Timelock
}

main();
