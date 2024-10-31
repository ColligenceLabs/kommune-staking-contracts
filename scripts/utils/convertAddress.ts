/*
 * npx hardhat run --network baobab scripts/utils/convertAddress.ts
 */

import { ethers } from "hardhat";

// 소문자 이더리움 주소 예제
// const lowerAddr = "0x46130681116e21a42cb7056a1ce6df04b56f4acc";
// const lowerAddr = "0xc950c777459511e13d564368ad49614f71ae8659";
const lowerAddr = "0xa56d247eddf4e3e585a4f3dc718675ce5799067b";

// 체크섬 주소로 변환
const checksumAddr = ethers.utils.getAddress(lowerAddr);

console.log(`Original: ${lowerAddr}`);
console.log(`Checksummed: ${checksumAddr}`);
