import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "QuickFlip"
    }),
    injected({
      target: {
        id: "okx",
        name: "OKX Wallet",
        provider: (window) => {
          const w = window as any;
          const directOkx = w?.okxwallet?.ethereum ?? w?.okxwallet;
          if (directOkx) return directOkx;

          const ethereumProvider = w?.ethereum;
          if (ethereumProvider?.isOkxWallet || ethereumProvider?.isOKExWallet) {
            return ethereumProvider;
          }

          const providers = ethereumProvider?.providers;
          if (Array.isArray(providers)) {
            return providers.find((p: any) => p?.isOkxWallet || p?.isOKExWallet);
          }

          return undefined;
        }
      }
    }),
    injected()
  ],
  transports: {
    [base.id]: http("https://mainnet.base.org")
  },
  ssr: true
});
