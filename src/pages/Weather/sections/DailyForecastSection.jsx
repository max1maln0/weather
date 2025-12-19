import DailyForecastRow from "./DailyForecastRow.jsx";

export default function DailyForecastSection({ daily }) {
  if (!daily || !daily.items) return null;

  const { items } = daily;

  return (
    <section className="rounded-2xl bg-white/2 backdrop-blur-md border border-white/10 text-white">
      
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="text-xs uppercase tracking-wide text-white/70">
          10-day forecast
        </span>
      </div>

      <div className="divide-y divide-white/10">
        {items.map((day) => (
            
          <DailyForecastRow key={day.label} day={day} />
        ))}
      </div>
    </section>
  );
}
