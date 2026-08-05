const items = [
  "Armenia",
  "Greece",
  "Yerevan",
  "Athens",
  "Long stays",
  "Field notes",
  "Quoted costs",
  "Slow travel",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-cream py-4" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="display text-2xl text-ink">{item}</span>
            <span className="h-2 w-2 rounded-full bg-terra" />
          </span>
        ))}
      </div>
    </div>
  );
}