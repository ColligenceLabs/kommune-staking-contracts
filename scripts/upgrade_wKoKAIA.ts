/*
 * npx hardhat run --network < baobab | cypress > scripts/upgrade_wKoKAIA.ts
 */

import { network } from "hardhat";

const { ethers, upgrades } = require("hardhat");

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

async function main() {
    const wKoKlayAddr =
        network.config.chainId === 1001
            ? "0xE019c5f1dDAF64A30d7d0B036b746aCbD4Aa8Af8"
            : "0xdEC2Cc84f0a37Ef917f63212FE8ba7494b0E4B15";

    // TODO : 이게 필요한 경우는 언제일까 ?
    const wKoKlayFactory = await ethers.getContractFactory("WKoKlay");
    const wkoKlay = await upgrades.forceImport(wKoKlayAddr, wKoKlayFactory, { kind: 'transparent' });
    console.log("wKoKLAY total supply : " + await wkoKlay.totalSupply());


    const wkoKaia = await ethers.getContractFactory("WKoKaia");

    console.log("Upgrading wKoKlay...");

    // const wKoKaia = await upgrades.upgradeProxy(wKoKlayAddr, wkoKaia);
    const wKoKaia = await upgrades.upgradeProxy(wKoKlayAddr, wkoKaia, {
        call: {
            fn: "setTicker",
            args: [],
        },
    })

    console.log("wKoKlayAddr upgraded to wKoKaia = ", wKoKaia.address);
    console.log(
        await upgrades.erc1967.getAdminAddress(wKoKaia.address),
        "Proxy Admin"
    );

    // 1. Check the result of the upgrading
    // 2. run a script to changeProxyAdmin to Timelock
}

main();
