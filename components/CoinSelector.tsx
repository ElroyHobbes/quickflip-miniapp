"use client";

type CoinSelectorProps = {
  selected: boolean | null;
  onSelect: (guess: boolean) => void;
};

export function CoinSelector({ selected, onSelect }: CoinSelectorProps) {
  return (
    <section className="panel">
      <p className="subtle">Choose your side</p>
      <div className="coin-grid">
        <button
          type="button"
          className={`coin-btn ${selected === true ? "selected" : ""}`}
          onClick={() => onSelect(true)}
          aria-pressed={selected === true}
        >
          Heads
        </button>
        <button
          type="button"
          className={`coin-btn ${selected === false ? "selected" : ""}`}
          onClick={() => onSelect(false)}
          aria-pressed={selected === false}
        >
          Tails
        </button>
      </div>
    </section>
  );
}
