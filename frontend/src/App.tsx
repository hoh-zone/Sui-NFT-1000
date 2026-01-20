import { ConnectButton } from "@mysten/dapp-kit";
import { Badge, Box, Button, Container, Flex, Heading, Text, Theme } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import { MintMemorialNft } from "./MintMemorialNft";
import "./App.css";

function App() {
  const [language, setLanguage] = useState<"zh" | "en">(() => {
    const stored = localStorage.getItem("language");
    if (stored === "zh" || stored === "en") {
      return stored;
    }
    const browserLang = navigator.language?.toLowerCase() ?? "en";
    return browserLang.startsWith("zh") ? "zh" : "en";
  });

  const [appearance, setAppearance] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", appearance);
  }, [appearance]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    setAppearance((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "zh" ? "en" : "zh"));
  };

  const copy = useMemo(
    () =>
      language === "zh"
        ? {
            title: "Sui 1000天纪念",
            badge: "1000 天",
            subtitle: "记录 Sui 上线 1000 天的纪念时刻，永久上链",
            mintTitle: "铸造 1000 天纪念 NFT",
            mintDesc: "连接钱包即可铸造纪念 NFT，编号与图像写入链上，永久可查。",
            themeButton: appearance === "dark" ? "浅色主题" : "深色主题",
            languageButton: "English",
            noticeTitle: "提示",
            notices: [
              "本 NFT 仅供纪念，不构成任何权益或收益承诺。",
              "每个地址仅可铸造一次。",
              "活动方保留最终解释权。",
            ],
            mintStrings: {
              mint: "铸造纪念 NFT",
              minting: "铸造中...",
              minted: "已铸造",
              connectWallet: "请先连接钱包再进行铸造。",
              setConfig: "请在 src/networkConfig.ts 配置 packageId 和 counterId。",
              waitingCounter: "等待共享 Counter 对象。",
              mintedCount: (count: number) => `已铸造数量：${count}`,
              alreadyMinted: "你已铸造过了，每个地址只能铸造一次。",
              progressLabel: (count: number, max: number) =>
                `进度：${count}/${max}`,
              viewOnSuiVision: "在 suivision.xyz 查看",
            },
          }
        : {
            title: "Sui 1000 Days",
            badge: "1000 Days",
            subtitle: "Celebrate Sui’s 1000‑day milestone on-chain.",
            mintTitle: "Mint the 1000‑Day NFT",
            mintDesc: "Connect a wallet to mint. The number and image are stored on-chain.",
            themeButton: appearance === "dark" ? "Light Theme" : "Dark Theme",
            languageButton: "中文",
            noticeTitle: "Notice",
            notices: [
              "This NFT is for commemorative purposes only and carries no rights or guarantees.",
              "Each address can mint only once.",
              "The organizer reserves the right of final interpretation.",
            ],
            mintStrings: {
              mint: "Mint Memorial NFT",
              minting: "Minting...",
              minted: "Minted",
              connectWallet: "Connect a wallet to mint.",
              setConfig: "Set packageId and counterId in src/networkConfig.ts.",
              waitingCounter: "Waiting for shared Counter object.",
              mintedCount: (count: number) => `Minted count: ${count}`,
              alreadyMinted: "You have already minted. One per address.",
              progressLabel: (count: number, max: number) =>
                `Progress: ${count}/${max}`,
              viewOnSuiVision: "View on suivision.xyz",
            },
          },
    [appearance, language],
  );

  return (
    <Theme appearance={appearance}>
      <div className="app-shell">
        <div className="background-grid" aria-hidden="true" />
        <div className="background-glow" aria-hidden="true" />

        <Flex className="app-nav" position="sticky" px="4" py="3" justify="between">
          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <Heading size="6">{copy.title}</Heading>
              <Badge variant="outline" radius="full">
                {copy.badge}
              </Badge>
            </Flex>
            <Text size="2" color="gray">
              {copy.subtitle}
            </Text>
          </Flex>

          <Flex gap="2" align="center">
            <Button className="glow-button" variant="soft" onClick={toggleTheme}>
              {copy.themeButton}
            </Button>
            <Button variant="outline" onClick={toggleLanguage}>
              {copy.languageButton}
            </Button>
            <ConnectButton />
          </Flex>
        </Flex>

        <Container className="app-content">
          <div className="card-panel">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5">{copy.mintTitle}</Heading>
              <Text size="2" color="gray">
                  {copy.mintDesc}
              </Text>
              </Box>
              <MintMemorialNft strings={copy.mintStrings} />
              <Box className="notice-panel">
                <Heading size="3">{copy.noticeTitle}</Heading>
                <Flex direction="column" gap="2">
                  {copy.notices.map((notice) => (
                    <Text key={notice} size="2" color="gray">
                      {notice}
                    </Text>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </div>
        </Container>
      </div>
    </Theme>
  );
}

export default App;
