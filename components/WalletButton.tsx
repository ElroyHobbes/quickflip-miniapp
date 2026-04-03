"use client";

import { useMemo, useState } from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function normalizeWalletError(error: unknown) {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("rejected")) return "You rejected the wallet request.";
    if (msg.includes("not found") || msg.includes("not installed")) {
      return "Selected wallet is not available in this browser.";
    }
    return error.message;
  }
  return "Wallet connection failed. Please try again.";
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [isWarn, setIsWarn] = useState(false);
  const [activeConnectorId, setActiveConnectorId] = useState<string | null>(null);

  const connectorMap = useMemo(() => {
    const coinbase = connectors.find((c) => c.id === "coinbaseWalletSDK");
    const okx = connectors.find(
      (c) => c.id.toLowerCase().includes("okx") || c.name.toLowerCase().includes("okx")
    );
    const injected = connectors.find((c) => c.id === "injected");
    return { coinbase, okx, injected };
  }, [connectors]);

  async function handleConnect(connector: Connector) {
    setLocalMessage(null);
    setIsWarn(false);
    setActiveConnectorId(connector.id);
    try {
      const provider = await connector.getProvider();
      if (!provider && connector.id !== "coinbaseWalletSDK") {
        setIsWarn(true);
        if (connector.name.toLowerCase().includes("okx")) {
          setLocalMessage("OKX wallet not detected. Open this site in OKX App browser.");
        } else {
          setLocalMessage(`${connector.name} is not available in this browser.`);
        }
        return;
      }

      await connectAsync({ connector });
      setLocalMessage(`Connected with ${connector.name}.`);
    } catch (error) {
      setIsWarn(true);
      setLocalMessage(normalizeWalletError(error));
    } finally {
      setActiveConnectorId(null);
    }
  }

  if (isConnected && address) {
    return (
      <div className="wallet-wrap">
        <button className="btn btn-secondary" onClick={() => disconnect()} type="button">
          {shortAddress(address)}
        </button>
        {localMessage ? (
          <p className="subtle" style={{ width: "100%", marginTop: 4, color: "#b9ffc9" }}>
            {localMessage}
          </p>
        ) : null}
      </div>
    );
  }

  const { coinbase, okx, injected } = connectorMap;

  return (
    <div className="wallet-wrap">
      {coinbase ? (
        <button
          className="btn"
          onClick={() => handleConnect(coinbase)}
          type="button"
          disabled={isPending || activeConnectorId !== null}
        >
          {isPending && activeConnectorId === coinbase.id ? "Connecting..." : "Connect Coinbase"}
        </button>
      ) : null}
      {okx ? (
        <button
          className="btn btn-secondary"
          onClick={() => handleConnect(okx)}
          type="button"
          disabled={isPending || activeConnectorId !== null}
        >
          {isPending && activeConnectorId === okx.id ? "Connecting..." : "Connect OKX"}
        </button>
      ) : null}
      {injected ? (
        <button
          className="btn btn-secondary"
          onClick={() => handleConnect(injected)}
          type="button"
          disabled={isPending || activeConnectorId !== null}
        >
          {isPending && activeConnectorId === injected.id ? "Connecting..." : "Browser Wallet"}
        </button>
      ) : null}
      {!coinbase && !okx && !injected ? (
        <p className="subtle" style={{ width: "100%", marginTop: 4, color: "#ffd4ce" }}>
          No wallet connector detected. Install OKX/Coinbase wallet first.
        </p>
      ) : null}
      {localMessage ? (
        <p className="subtle" style={{ width: "100%", marginTop: 4, color: isWarn ? "#ffd4ce" : "#b9ffc9" }}>
          {localMessage}
        </p>
      ) : null}
    </div>
  );
}
