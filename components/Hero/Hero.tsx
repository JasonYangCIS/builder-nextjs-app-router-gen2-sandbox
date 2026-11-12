export interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title = "Hello from Builder",
  subtitle = "Edit me in the Visual Editor",
}: HeroProps) {
  return (
    <section className="px-6 py-16 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-lg text-zinc-600">{subtitle}</p>
    </section>
  );
}
