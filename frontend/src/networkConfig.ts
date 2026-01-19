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
        packageId: "0x767ab287e37111d176070793eaf2cf446fa4309cfc321c501c53250bac54a16a",
        counterId: "0xb25c5b328480c1e95cc844b4ad94b976092f2ca5be117a6c3ef8d031f2713d49",
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        packageId: "0x0",
        counterId: "0x0",
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
