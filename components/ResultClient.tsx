"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

import { BottomNav } from "@/components/BottomNav";
import { GameHeader } from "@/components/GameHeader";
import { ResultCard } from "@/components/ResultCard";
import { StatusChip } from "@/components/StatusChip";
import { WalletButton } from "@/components/WalletButton";
import { WinsBoard } from "@/components/WinsBoard";
import { useWins } from "@/hooks/useWins";

function isCoinSide(value: string | null) {
  return value === "heads" || value === "tails";
}

function isBoolString(value: string | null) {
  return value === "true" || value === "false";
}

export function ResultClient() {
  const params = useSearchParams();
  const guess = params.get("guess");
  const result = params.get("result");
  const win = params.get("win");
  const tx = params.get("tx");

  const validQuery =
    isCoinSide(guess) && (result === null || isCoinSide(result)) && (win === null || isBoolString(win));

  const { address } = useAccount();
  const { winsText, isLoading } = useWins(address);

  return (
    <main className="page-shell">
      <section className="page-card">
        <GameHeader subtitle="Recent round settlement" />

        <section className="panel">
          <p className="subtle" style={{ marginBottom: 10 }}>
            Wallet
          </p>
          <WalletButton />
        </section>

        {validQuery ? (
          <ResultCard guess={guess} result={result} win={win} txHash={tx} />
        ) : (
          <section className="panel">
            <div className="chips">
              <StatusChip
                tone="warn"
                label="No valid query result found. Try /result?guess=heads&result=tails&win=false"
              />
            </div>
          </section>
        )}

        <section className="panel">
          <WinsBoard winsText={winsText} loading={isLoading} />
          <p className="subtle" style={{ marginTop: 8 }}>
            Current wallet onchain wins are shown when connected.
          </p>
        </section>

        <section className="panel inline-actions">
          <Link href="/" className="btn" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            Play Again
          </Link>
          <Link
            href="/"
            className="btn btn-secondary"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            Back Home
          </Link>
        </section>

        <BottomNav />
      </section>
    </main>
  );
}
