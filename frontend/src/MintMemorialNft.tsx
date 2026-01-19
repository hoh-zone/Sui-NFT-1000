import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClientQuery } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { useMemo } from "react";
import { useNetworkVariable } from "./networkConfig";

type MintMemorialNftStrings = {
  mint: string;
  minting: string;
  connectWallet: string;
  setConfig: string;
  waitingCounter: string;
  mintedCount: (count: number) => string;
  viewOnSuiVision: string;
};

type MintMemorialNftProps = {
  strings: MintMemorialNftStrings;
};

export function MintMemorialNft({ strings }: MintMemorialNftProps) {
  const account = useCurrentAccount();
  const packageId = useNetworkVariable("packageId");
  const counterId = useNetworkVariable("counterId");
  const { mutate: signAndExecuteTransaction, isPending, data, error } =
    useSignAndExecuteTransaction();

  const { data: counterObject, isPending: isCounterPending } = useSuiClientQuery(
    "getObject",
    {
      id: counterId,
      options: {
        showOwner: true,
        showContent: true,
      },
    },
    {
      enabled: !!counterId && counterId !== "0x0",
    },
  );

  const sharedVersion = useMemo(() => {
    const owner = counterObject?.data?.owner;
    if (owner && "Shared" in owner) {
      return owner.Shared.initial_shared_version;
    }
    return null;
  }, [counterObject]);

  const counterValue = useMemo(() => {
    const content = counterObject?.data?.content;
    if (content && content.dataType === "moveObject") {
      const fields = content.fields as { value?: string | number };
      if (typeof fields.value === "number") {
        return fields.value;
      }
      if (typeof fields.value === "string") {
        return Number.parseInt(fields.value, 10);
      }
    }
    return null;
  }, [counterObject]);

  const handleMint = () => {
    if (!sharedVersion) return;
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::memorial_nft::mint`,
      arguments: [
        tx.sharedObjectRef({
          objectId: counterId,
          initialSharedVersion: sharedVersion,
          mutable: true,
        }),
      ],
    });
    signAndExecuteTransaction({ transaction: tx });
  };

  const disabled =
    !account ||
    !sharedVersion ||
    packageId === "0x0" ||
    counterId === "0x0" ||
    isPending ||
    isCounterPending;

  return (
    <Flex direction="column" gap="2">
      <Button onClick={handleMint} disabled={disabled}>
        {isPending ? strings.minting : strings.mint}
      </Button>
      {!account ? (
        <Text size="2" color="gray">
          {strings.connectWallet}
        </Text>
      ) : null}
      {packageId === "0x0" || counterId === "0x0" ? (
        <Text size="2" color="gray">
          {strings.setConfig}
        </Text>
      ) : null}
      {!sharedVersion && counterId !== "0x0" ? (
        <Text size="2" color="gray">
          {strings.waitingCounter}
        </Text>
      ) : null}
      {counterValue !== null ? (
        <Text size="2" color="gray">
          {strings.mintedCount(counterValue)}
        </Text>
      ) : null}
      {error ? (
        <Text size="2" color="red">
          {error.message}
        </Text>
      ) : null}
      {data ? (
        <Flex direction="column" gap="1">
          <Text size="2" color="green">
            Minted. Digest: {data.digest}
          </Text>
          <Link
            size="2"
            href={`https://suivision.xyz/txblock/${data.digest}`}
            target="_blank"
            rel="noreferrer"
          >
            {strings.viewOnSuiVision}
          </Link>
        </Flex>
      ) : null}
    </Flex>
  );
}
