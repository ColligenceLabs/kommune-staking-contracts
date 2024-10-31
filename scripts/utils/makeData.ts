/*
 * npx hardhat run --network < baobab | cypress > scripts/makeData.ts
 */

import { ethers } from "ethers";

import treasury from "../../artifacts/contracts/Treasury.sol/Treasury.json";
import nodeManager from "../../artifacts/contracts/NodeManager.sol/NodeManager.json";
import koKaia from "../../artifacts/contracts/KoKaia.sol/KoKaia.json";

// npx hardhat run scripts/makeData.ts

const makeTxData = (ABI: any, method: string, methodArgs: any[]): any => {
  // const ABI = ['function transfer(address to, uint amount)'];
  const iFace = new ethers.utils.Interface(ABI);

  // const data = iFace.encodeFunctionData('transfer', [
  //   '0x1234567890123456789012345678901234567890',
  //   ethers.utils.parseEther('1.0'),
  // ]);
  // data = '0xa9059cbb00000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000';

  return iFace.encodeFunctionData(method, methodArgs);
};

// const yyy = makeTxData(treasury.abi, "initialize", []);
// console.log(yyy);
//
// const xxx = makeTxData(nodeManager.abi, "initialize", [
//   "0xb1D9f4113fae36761C6aaE82b9C6983F274206F4",
//   345600,
//   "0x9015fe6Ade4CA2456C0235c14a868bc95037A9A2",
// ]);
// console.log(xxx);

// const data = makeTxData(koKaia.abi, "initialize", [
//   "0x5B5aC224BD23D2BfD02b5d9769e3EE388CAa41BD",
//   "0xf5F71D90f605f1BAdA44ae60f59E59c21417Df57",
// ]);
// console.log(data);

const proxyAbi = [{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const data1 = makeTxData(proxyAbi, "changeAdmin", [
  "0x8e59092C69134d2c69df7A01Fd7D88BBf49380fc",
]);
console.log(data1);

// const proxyAdminAbi = [
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "proxy",
//         "type": "address"
//       }
//     ],
//     "name": "getProxyImplementation",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "renounceOwnership",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "proxy",
//         "type": "address"
//       },
//       {
//         "name": "newAdmin",
//         "type": "address"
//       }
//     ],
//     "name": "changeProxyAdmin",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "owner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isOwner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "proxy",
//         "type": "address"
//       },
//       {
//         "name": "implementation",
//         "type": "address"
//       },
//       {
//         "name": "data",
//         "type": "bytes"
//       }
//     ],
//     "name": "upgradeAndCall",
//     "outputs": [],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "proxy",
//         "type": "address"
//       },
//       {
//         "name": "implementation",
//         "type": "address"
//       }
//     ],
//     "name": "upgrade",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transferOwnership",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "proxy",
//         "type": "address"
//       }
//     ],
//     "name": "getProxyAdmin",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "previousOwner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "OwnershipTransferred",
//     "type": "event"
//   }
// ];
//
// const data2 = makeTxData(proxyAdminAbi, "changeProxyAdmin", [
//     "0xb15782EFbC2034E366670599F3997f94c7333FF9",
//     "0x8e59092C69134d2c69df7A01Fd7D88BBf49380fc",
// ]);
//
// console.log(data2);
