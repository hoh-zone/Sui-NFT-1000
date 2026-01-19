import { getFullnodeUrl } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        packageId: "0x0",
        counterId: "0x0",
      },
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        packageId: "0xd62867a9635fc23cff43eb22c7c4256198524169c1ebc36d4f182e58fa75fe7e",
        counterId: "0x0f4a55a1f145a14727cdde269846be2cbb5851a0d0003c23f906ca58bb6b306b",
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        packageId: "0xe21d3d819f584e3577b6f00cb2e84593227311f9ef6d80b1cd6b6eb34662ce73",
        counterId: "0xb24371c606ee0c7b8aa77ba90a328d96048c726bae49ed417f99ef32383f6958",
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
