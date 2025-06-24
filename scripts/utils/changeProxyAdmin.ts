/*
 * npx hardhat run --network < baobab | cypress > scripts/utils/changeProxyAdmin.ts
 */

import { network } from "hardhat";

const { upgrades } = require("hardhat");

async function main() {
    const Timelock = network.config.chainId === 1001
        ? '0xf5F71D90f605f1BAdA44ae60f59E59c21417Df57'
        : '0x2A77c5b935531b498cd42a796f0AA2D8497C5dD5'

    const KoKaia =
        network.config.chainId === 1001
            ? "0xb15782EFbC2034E366670599F3997f94c7333FF9" // "0xd62cBd965e32e1Fc20DDf0ACf386729B0945D9dE"
            : "0xa1338309658d3da331c747518d0bb414031f22fd"; // "0x42D4a59785a477588e464ac7421c385619087911";


    const wKoKaia =
        network.config.chainId === 1001
            ? "0xE019c5f1dDAF64A30d7d0B036b746aCbD4Aa8Af8"
            : "0xdEC2Cc84f0a37Ef917f63212FE8ba7494b0E4B15";

    if (network.config.chainId === 8217) {
        // Done
        // await upgrades.admin.changeProxyAdmin(KoKaia, Timelock);
        // console.log("changeProxyAdmin : ", KoKaia, Timelock);

        // Not Yet
        await upgrades.admin.changeProxyAdmin(wKoKaia, Timelock);
        console.log("changeProxyAdmin : ", wKoKaia, Timelock);
    }
}

main();
