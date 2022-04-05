import { ethers, network, deployments } from "hardhat";
import { sleep } from "../../src/utils";
import { getAddressBookByNetwork } from "../../src/config";
import VoteEscrow from "../build/contracts/VotingEscrow.json";
import EscrowDelegation from "../build/contracts/DelegationProxy.json";
import Gauge from "../build/contracts/LiquidityGaugeV4.json";

const addresses = getAddressBookByNetwork(network.name);

const deploy = async () => {
  const crvAddress = (await deployments.get("MockCRV")).address;
  console.log("crv address:", crvAddress);
  if (
    network.name === "mainnet" ||
    network.name === "matic" ||
    network.name === "optimism"
  ) {
    console.log(
      `Deploying Vyper Contracts to ${network.name}. Hit ctrl + c to abort`
    );
    await sleep(10000);
  }
  const [signer] = await ethers.getSigners();
  const veFactory = ethers.ContractFactory.fromSolidity(VoteEscrow);
  const ve = await veFactory
    .connect(signer)
    .deploy(crvAddress, "Vote Escrowed CRV", "veCRV", "1.0.0", {
      gasLimit: 6000000,
    });
  console.log("VOTING ESCROW DEPLOYED:", ve.address);
  await sleep(10000);
  const veBoostFactory = ethers.ContractFactory.fromSolidity(EscrowDelegation);
  const veBoost = await veBoostFactory
    .connect(signer)
    .deploy(ve.address, ethers.constants.AddressZero, addresses.AdminMultiSig, {
      gasLimit: 6000000,
    });
  console.log("DELEGATION PROXY DEPLOYED:", veBoost.address);
  await sleep(10000);
  const gaugeImplFactory = ethers.ContractFactory.fromSolidity(Gauge);
  const gaugeImpl = await gaugeImplFactory
    .connect(signer)
    .deploy({ gasLimit: 6000000 });
  console.log("GAUGE IMPLEMENTATION DEPLOYED:", gaugeImpl.address);
};

(async () => {
  await deploy();
})();
