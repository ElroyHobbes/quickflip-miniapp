"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="wallet-wrap">
        <button className="btn btn-secondary" onClick={() => disconnect()} type="button">
          {shortAddress(address)}
        </button>
      </div>
    );
  }

  const coinbase = connectors.find((c) => c.id === "coinbaseWalletSDK");
  const injected = connectors.find((c) => c.id === "injected");

  return (
    <div className="wallet-wrap">
      {coinbase ? (
        <button className="btn" onClick={() => connect({ connector: coinbase })} type="button">
          {isPending ? "Connecting..." : "Connect Coinbase"}
        </button>
      ) : null}
      {injected ? (
        <button
          className="btn btn-secondary"
          onClick={() => connect({ connector: injected })}
          type="button"
        >
          Browser Wallet
        </button>
      ) : null}
    </div>
  );
}
