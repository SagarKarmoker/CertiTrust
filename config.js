
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "CertiTrust",
  projectId: "0e276d0f57e30fea190f8962759a6815",
  chains: [baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;