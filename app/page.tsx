"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { BottomNav } from "@/components/BottomNav";
import { CoinSelector } from "@/components/CoinSelector";
import { FlipActionPanel } from "@/components/FlipActionPanel";
import { GameHeader } from "@/components/GameHeader";
import { StatusChip } from "@/components/StatusChip";
import { WalletButton } from "@/components/WalletButton";
import { WinsBoard } from "@/components/WinsBoard";
import { useTrackedFlip } from "@/hooks/useTrackedFlip";
import { useWins } from "@/hooks/useWins";

function labelFromGuess(guess: boolean) {
  return guess ? "heads" : "tails";
}

function normalizeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Flip failed. Please check wallet and network, then retry.";
}

export default function HomePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [selectedGuess, setSelectedGuess] = useState<boolean | null>(null);
  const [statusText, setStatusText] = useState("Connect wallet to play.");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const { winsText, isLoading, refetchWins } = useWins(address);
  const { flipTracked, isFlipping } = useTrackedFlip();

  const actionHint = useMemo(() => {
    if (!isConnected) return "Connect wallet to play";
    if (selectedGuess === null) return "Choose Heads or Tails first";
    return "Each flip sends a real onchain transaction";
  }, [isConnected, selectedGuess]);

  const disabled = !isConnected || selectedGuess === null;

  async function handleFlip() {
    if (!address || selectedGuess === null) return;
    setErrorText(null);
    setStatusText("Submitting onchain flip...");

    try {
      const { txHash, flipEvent } = await flipTracked({
        guess: selectedGuess,
        userAddress: address
      });

      setLastTxHash(txHash);
      await refetchWins();

      if (flipEvent) {
        setStatusText("Flip mined. Redirecting to result...");
        router.push(
          `/result?guess=${labelFromGuess(flipEvent.guess)}&result=${labelFromGuess(
            flipEvent.result
          )}&win=${String(flipEvent.win)}&tx=${txHash}`
        );
        return;
      }

      setStatusText("Flip submitted. Your onchain wins have been refreshed.");
    } catch (error) {
      setErrorText(normalizeErrorMessage(error));
      setStatusText("Flip failed. Please try again.");
    }
  }

  return (
    <main className="page-shell">
      <section className="page-card">
        <GameHeader />

        <section className="panel">
          <p className="subtle" style={{ marginBottom: 10 }}>
            Wallet
          </p>
          <WalletButton />
          <div className="chips" style={{ marginTop: 10 }}>
            <StatusChip label={isConnected ? "Wallet connected" : "Wallet disconnected"} />
            <StatusChip label="Onchain flip enabled" />
          </div>
        </section>

        <section className="hero">
          <Image
            src="/scene-quickflip.svg"
            alt="QuickFlip arcade scene"
            width={900}
            height={420}
            className="hero-img"
            priority
          />
          <div className="hero-glow" />
        </section>

        <CoinSelector selected={selectedGuess} onSelect={setSelectedGuess} />

        <section className="panel">
          <WinsBoard winsText={winsText} loading={isLoading} />
        </section>

        <FlipActionPanel disabled={disabled} loading={isFlipping} hint={actionHint} onFlip={handleFlip} />

        <section className="panel">
          <p className="subtle">Game Status</p>
          <div className="chips" style={{ marginTop: 8, marginBottom: 8 }}>
            <StatusChip label={statusText} tone={errorText ? "warn" : "default"} />
          </div>
          {lastTxHash ? <p className="tx-hash">Last tx: {lastTxHash}</p> : null}
          {errorText ? <p className="subtle" style={{ color: "#ffd4ce" }}>{errorText}</p> : null}
          <p className="subtle">
            Need details? Open the <Link href="/about">About</Link> page.
          </p>
        </section>

        <BottomNav />
      </section>
    </main>
  );
}
