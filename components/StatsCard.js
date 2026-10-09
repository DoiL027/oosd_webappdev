export default function StatsCard({ title, value, icon, color }) {
  return (
    <article className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-md">
      <span
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${color} text-2xl text-white`}
      >
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </article>
  );
}
