/*
 * npx hardhat run --network < baobab | cypress > scripts/utils/dencodeData.ts
 */

import { ethers } from "ethers";

import treasury from "../../artifacts/contracts/Treasury.sol/Treasury.json";
import nodeManager from "../../artifacts/contracts/NodeManager.sol/NodeManager.json";
import koKaia from "../../artifacts/contracts/KoKaia.sol/KoKaia.json";

// npx hardhat run scripts/makeData.ts

// const abiEncode = (): any => {
//   const abi = ethers.utils.defaultAbiCoder;
//
//   const data = abi.encode(
//     ["address", "address", "uint256", "string"],
//     [
//       "0xc88a8dDd9E56cC6a26404B6c412f2FCF290BdE3D",
//       "0xc88a8dDd9E56cC6a26404B6c412f2FCF290BdE3D",
//       100,
//       "Kommune DAO",
//     ]
//   );
//
//   console.log(data);
// };

// Get timelock2 queued transaction hash
const abiEncode = (): any => {
    const abi = ethers.utils.defaultAbiCoder;

    const data = abi.encode(
        ["address", "uint", "string", "bytes", "uint"],
        [
            "0x8e59092C69134d2c69df7A01Fd7D88BBf49380fc",
            0,
            "changeProxyAdmin(address,address)",
            "0x7eff275e000000000000000000000000b15782efbc2034e366670599f3997f94c7333ff90000000000000000000000008e59092c69134d2c69df7a01fd7d88bbf49380fc",
            1725082200,
        ]
    );

    const qtHash = ethers.utils.keccak256(data)

    console.log(qtHash);
};

abiEncode();
