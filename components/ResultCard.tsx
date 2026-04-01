"use client";

type ResultCardProps = {
  guess?: string | null;
  result?: string | null;
  win?: string | null;
  txHash?: string | null;
};

function normalizeWin(win: string | null | undefined) {
  if (!win) return null;
  if (win === "true") return true;
  if (win === "false") return false;
  return null;
}

export function ResultCard({ guess, result, win, txHash }: ResultCardProps) {
  const winValue = normalizeWin(win);

  return (
    <section className="panel result-card">
      <h2 className="brand-title" style={{ fontSize: 20, margin: 0 }}>
        Result
      </h2>
      <div className="result-row">
        <span className="result-key">Your Guess</span>
        <span className="result-value">{guess ?? "Unknown"}</span>
      </div>
      <div className="result-row">
        <span className="result-key">Coin Result</span>
        <span className="result-value">{result ?? "Pending/Unknown"}</span>
      </div>
      <div className="result-row">
        <span className="result-key">Outcome</span>
        {winValue === null ? (
          <span className="badge">Pending</span>
        ) : (
          <span className={`badge ${winValue ? "win" : "lose"}`}>{winValue ? "WIN" : "LOSE"}</span>
        )}
      </div>
      {txHash ? <p className="tx-hash">Tx: {txHash}</p> : null}
    </section>
  );
}
