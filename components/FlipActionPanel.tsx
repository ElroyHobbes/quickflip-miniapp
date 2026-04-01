"use client";

type FlipActionPanelProps = {
  disabled: boolean;
  loading: boolean;
  hint: string;
  onFlip: () => void;
};

export function FlipActionPanel({ disabled, loading, hint, onFlip }: FlipActionPanelProps) {
  return (
    <section className="panel">
      <button className="flip-btn" type="button" onClick={onFlip} disabled={disabled || loading}>
        {loading ? "Flipping onchain..." : "Flip Coin"}
      </button>
      <p className="subtle" style={{ marginTop: 10 }}>
        {hint}
      </p>
    </section>
  );
}
