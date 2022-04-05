// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAddressBookByNetwork = (network: string) => {
  switch (network) {
    case "optimism":
      return {
        AdminMultiSig: "0xAa2E0c5c85ACb7717e58060AB3c96d2B184EE07C",
        GaugeImplementation: "0xe03311D30bdeb60511BAe8de135C6524B9576B2e",
        MockCRV: "0xB9BB2856e0Af9d3e855b0173A40059Fc29b632dA",
        MockVE: "0xd158CCfabef917ae2f01E454D07E1F2055e44c79",
        MockBoost: "0x336649aEb266f3182d63f4FAD7B3cF0dBa15f4c8",
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
        GaugeImplementation: "0x16Bb396868Cc76D179533A18ED6B11a1ec8bd49a",
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
