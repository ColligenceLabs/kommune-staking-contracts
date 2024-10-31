/*
 * npx hardhat run --network < baobab | cypress > scripts/deploy-KoKaia.ts
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
    const Timelock =
        network.config.chainId === 1001
            ? "0xf5F71D90f605f1BAdA44ae60f59E59c21417Df57"
            : "0x2A77c5b935531b498cd42a796f0AA2D8497C5dD5";

    const owner = await ethers.getSigner(<string>network.config.from);
    console.log(">> Deploy owner : ", owner.address);

    // WKoKaia
    await sleep(2000);
    const wkoKaia = await ethers.getContractFactory("WKoKaia");
    const WKoKaia = await upgrades.deployProxy(wkoKaia, [KoKaia], {
        initializer: "initialize",
    });
    await WKoKaia.deployed();
    console.log("WKoKaia deployed here", WKoKaia.address);

    // Ownerable 이 아님. "TypeError: WKoKaia.transferOwnership is not a function"
    // const tx = await WKoKaia.transferOwnership(Timelock);
    // const receipt = await tx.wait();
    // console.log("WKoKaia transferOwnership : ", receipt.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
