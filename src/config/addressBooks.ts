// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAddressBookByNetwork = (network: string) => {
  switch (network) {
    case "optimism":
      return {
        AdminMultiSig: "0xAa2E0c5c85ACb7717e58060AB3c96d2B184EE07C",
        GaugeImplementation: "",
        MockCRV: "",
        MockVE: "",
        MockBoost: "",
      };

    case "mainnet":
      return {
        AdminMultiSig: "",
        GaugeImplementation: "",
        MockCRV: "",
        MockVE: "",
        MockBoost: "",
      };

    case "matic":
      return {
        AdminMultiSig: "0xAa2E0c5c85ACb7717e58060AB3c96d2B184EE07C",
        GaugeImplementation: "0x384D4fb21fd9c8Cc77c3448b4303B0C40Ae99a5D",
        MockCRV: "0x3755CEaa62F70B989f1DE71d6b868cEd2dAD0D32",
        MockVE: "0x9d9208c87dc9b3a458Af62f510fdEC401a08DDc0",
        MockBoost: "0x9a1cF3931e682C32acF35b1D238090560B4815E5",
      };

    case "goerli":
      return {
        AdminMultiSig: "",
        GaugeImplementation: "",
        MockCRV: "",
        MockVE: "",
        MockBoost: "",
      };
    case "hardhat":
      return {
        AdminMultiSig: "0xAa2E0c5c85ACb7717e58060AB3c96d2B184EE07C",
        GaugeImplementation: "",
        MockCRV: "",
        MockVE: "",
        MockBoost: "",
      };

    default: {
      throw new Error(`addressBooks: network: ${network} not supported`);
    }
  }
};
