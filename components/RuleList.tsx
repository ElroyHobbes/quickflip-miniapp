"use client";

type RuleListProps = {
  items: string[];
};

export function RuleList({ items }: RuleListProps) {
  return (
    <ul className="rule-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
