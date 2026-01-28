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
        packageId: "0xda33315cb14049a455ae9f7b029314bf85839b5650843b8b818b76956c5d3b05",
        counterId: "0x8b3ccc2bd6a3661d01d5158be87df74f17c86db63b8e665b212037c941db6032",
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
