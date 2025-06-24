/*
 * npx hardhat run --network < baobab | cypress > scripts/deploy-wKoKaia-only.ts
 */

import { ethers, upgrades, network } from "hardhat";

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

async function main() {
    //
    const KoKaia =
        network.config.chainId === 1001
            ? "0xb15782EFbC2034E366670599F3997f94c7333FF9"
            : "0xa1338309658d3da331c747518d0bb414031f22fd";

    const owner = await ethers.getSigner(<string>network.config.from);
    console.log(">> Deploy owner : ", owner.address);

    // WKoKaia
    const wkoKaia = await ethers.getContractFactory("WKoKaia");
    const WKoKaia = await upgrades.deployProxy(wkoKaia, [KoKaia], {
        initializer: "initialize",
    });
    await WKoKaia.deployed();
    console.log("WKoKaia deployed here", WKoKaia.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
