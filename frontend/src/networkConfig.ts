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
        packageId: "0xa67ccf398895e165b519ce7c1f714b5d4862ed2be94cc102affd54a8930a05d5",
        counterId: "0xd2a7c97a6ddebef6b3e1d8afdc395e846719c1842db1d22afc6a5ebecaabb9b2",
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
