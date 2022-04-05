import { ethers, network, deployments } from "hardhat";
import { sleep } from "../../src/utils";
import LiquidityGaugeV4 from "../build/contracts/LiquidityGaugeV4.json";
import { getAddressBookByNetwork } from "../../src/config";

const addresses = getAddressBookByNetwork(network.name);

const deploy = async (lpTokenAddr: string) => {
  const crvAddress = (await deployments.get("MockCRV")).address;
  console.log("crv address:", crvAddress);
  if (
    network.name === "mainnet" ||
    network.name === "matic" ||
    network.name === "optimism"
  ) {
    console.log(
      `Deploying LiquidityGaugeV4 to ${network.name}. Hit ctrl + c to abort`
    );
    console.log("base implementation address:", addresses.GaugeImplementation);
    console.log("lp token address:", lpTokenAddr);
    console.log("ve address:", addresses.MockVE);
    console.log("veBoost proxy address:", addresses.MockBoost);
    await sleep(20000);
  }
  const [signer] = await ethers.getSigners();
  const gaugeImpl = await ethers.getContractAt(
    LiquidityGaugeV4.abi,
    addresses.GaugeImplementation
  );
  const encoded = gaugeImpl.interface.encodeFunctionData("initialize", [
    lpTokenAddr,
    addresses.AdminMultiSig,
    crvAddress,
    addresses.MockVE,
    addresses.MockBoost,
    addresses.AdminMultiSig,
  ]);
  const factory = await ethers.getContractFactory("EIP173Proxy");
  const contract = await factory
    .connect(signer)
    .deploy(addresses.GaugeImplementation, await signer.getAddress(), encoded, {
      gasLimit: 6000000,
      gasPrice: ethers.utils.parseUnits("40", "gwei"),
    });

  console.log("GAUGE DEPLOYED:", contract.address);
};

(async () => {
  await deploy(
    // LP TOKEN ADDRESS
    "0x4Fe4d754d1B2feaAd266332CfE3d3fcaa632c953"
  );
})();
