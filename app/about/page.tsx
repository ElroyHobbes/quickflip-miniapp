"use client";

import { BottomNav } from "@/components/BottomNav";
import { GameHeader } from "@/components/GameHeader";
import { RuleList } from "@/components/RuleList";
import { StatusChip } from "@/components/StatusChip";

const rules = [
  "Choose heads or tails, then submit a flip.",
  "Each flip is an onchain transaction.",
  "Wins are recorded onchain via getWins(address).",
  "Current contract supports a simple heads-or-tails guess with onchain win counting.",
  "Wins are recorded onchain as a lightweight score.",
  "Current version does not include token rewards, payouts, or advanced game modes.",
  "More advanced game mechanics can be added in a future upgrade."
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-card">
        <GameHeader subtitle="Rules and capability notes" />

        <section className="panel">
          <div className="chips" style={{ marginBottom: 10 }}>
            <StatusChip label="Honest onchain scope" />
            <StatusChip label="No fake rewards" />
          </div>
          <RuleList items={rules} />
        </section>

        <BottomNav />
      </section>
    </main>
  );
}
