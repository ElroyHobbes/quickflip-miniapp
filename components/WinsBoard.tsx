"use client";

type WinsBoardProps = {
  winsText: string;
  loading?: boolean;
};

export function WinsBoard({ winsText, loading = false }: WinsBoardProps) {
  return (
    <section className="wins-board">
      <p className="wins-label">Onchain Wins</p>
      <p className="wins-value">{loading ? "..." : winsText}</p>
    </section>
  );
}
