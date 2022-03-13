import { deployments, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { sleep } from "../src/utils";
import { getAddressBookByNetwork } from "../src/config/addressBooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  if (
    hre.network.name === "mainnet" ||
    hre.network.name === "matic" ||
    hre.network.name === "optimism"
  ) {
    console.log(
      `Deploying GaugeRegistry to ${hre.network.name}. Hit ctrl + c to abort`
    );
    await sleep(10000);
  }

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const addresses = getAddressBookByNetwork(hre.network.name);

  await deploy("GaugeRegistry", {
    from: deployer,
    proxy: {
      proxyContract: "EIP173Proxy",
      owner: addresses.AdminMultiSig,
    },
    args: [],
    log: hre.network.name !== "hardhat" ? true : false,
  });
};

export default func;

func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const shouldSkip =
    hre.network.name === "mainnet" ||
    hre.network.name === "matic" ||
    hre.network.name === "goerli" ||
    hre.network.name === "optimism";

  return shouldSkip ? true : false;
};

func.tags = ["GaugeRegistry"];