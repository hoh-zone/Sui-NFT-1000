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
        packageId: "0x6620cd74f948a68149aa613b050706782cad2be8e07a9dfe64cdcf81c90367d5",
        counterId: "0x76bcdebb7bd2ce2ce64976d9a5c5c79c9db367c38ff15b1b059eea26ab44bbb0",
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
