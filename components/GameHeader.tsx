"use client";

type GameHeaderProps = {
  subtitle?: string;
};

export function GameHeader({ subtitle = "Arcade onchain coin toss" }: GameHeaderProps) {
  return (
    <div className="header-wrap panel">
      <div>
        <p className="chip">Base Mini App</p>
        <h1 className="brand-title">QuickFlip</h1>
        <p className="brand-sub">{subtitle}</p>
      </div>
    </div>
  );
}
