"use client";

type StatusChipProps = {
  label: string;
  tone?: "default" | "success" | "warn";
};

export function StatusChip({ label, tone = "default" }: StatusChipProps) {
  const className = tone === "default" ? "chip" : `chip ${tone}`;
  return <span className={className}>{label}</span>;
}
