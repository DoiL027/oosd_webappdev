import Image from "next/image";

export default function StudentCard({
  name,
  year,
  major,
  email,
  badge,
  photo,
  onRemove,
}) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between gap-3">
        {photo ? (
          <Image
            src={photo}
            alt={`${name}'s photo`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-lg font-semibold text-sky-700">
            {name.charAt(0)}
          </div>
        )}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
          {badge}
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900">{name}</h2>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">Year:</span> {year}
        </p>
        <p>
          <span className="font-medium text-slate-800">Major:</span> {major}
        </p>
        <p>
          <span className="font-medium text-slate-800">Email:</span> {email}
        </p>
      </div>
      {onRemove ? (
        <button
          className="mt-5 min-h-10 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          type="button"
          onClick={() => {
            if (window.confirm(`Remove ${name} from the student directory?`)) {
              onRemove();
            }
          }}
        >
          Remove student
        </button>
      ) : null}
    </article>
  );
}
