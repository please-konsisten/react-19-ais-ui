import type { ReactNode } from 'react';

export function PageHeader({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stats({ items }: { items: { label: string; value: string; hint?: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="bg-card p-5">
          <dt className="text-sm text-muted-foreground">{i.label}</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{i.value}</dd>
          {i.hint && <p className="mt-0.5 text-xs text-muted-foreground">{i.hint}</p>}
        </div>
      ))}
    </dl>
  );
}

export function Panel({ title, action, className = '', children }: { title: string; action?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section className={`rounded-2xl border bg-card ${className}`}>
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="font-medium">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function LetterBadge({ letter }: { letter: string }) {
  const tone = letter.startsWith('A')
    ? 'bg-primary text-primary-foreground'
    : letter.startsWith('B') ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground';
  return <span className={`inline-flex h-7 min-w-9 items-center justify-center rounded-md px-2 text-sm font-semibold ${tone}`}>{letter}</span>;
}
