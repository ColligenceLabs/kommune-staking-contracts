/*
 * npx hardhat run --network < baobab | cypress > scripts/upgrade_Treasury.ts
 */

import { network } from "hardhat";

const { ethers, upgrades } = require("hardhat");

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

async function main() {
    const treasuryAddress =
        network.config.chainId === 1001
            ? "0x86bBBAC152Ba75A9adbf71b9180EC49BF3144943" // "0x108A2BaE876d09a6DF2a84CD69F1c3511871435e"
            : "0xFBf389be9EF4cEd3a95bDC2A6fC94B81c8E374A3";

    // TODO : 이게 필요한 경우는 언제일까 ?
    // const treasuryFactory = await ethers.getContractFactory("Treasury");
    // const treasuryV1 = await upgrades.forceImport(treasury, treasuryFactory, { kind: 'transparent' });
    // console.log("treasury total supply : " + await treasuryV1.totalSupply());

    const treasury = await ethers.getContractFactory("TreasuryV2");

    console.log("Upgrading Treasury...");

    const treasuryV2 = await upgrades.upgradeProxy(treasuryAddress, treasury);

    console.log("wKoKlayAddr upgraded to wKoKaia = ", treasuryV2.address);
    console.log(
        await upgrades.erc1967.getAdminAddress(treasuryV2.address),
        "Proxy Admin"
    );

    // 1. Check the result of the upgrading
    // 2. run a script to changeProxyAdmin to Timelock
}

main();
