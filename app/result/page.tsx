import { Suspense } from "react";

import { ResultClient } from "@/components/ResultClient";

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="page-shell">
          <section className="page-card">
            <section className="panel">
              <p className="subtle">Loading result...</p>
            </section>
          </section>
        </main>
      }
    >
      <ResultClient />
    </Suspense>
  );
}
