import { Suspense } from "react";
import { connection } from "next/server";
import StudentDashboard from "../components/StudentDashboard";
import { getAllStudents } from "./lib/students";

async function DatabaseStudentDashboard() {
  await connection();
  const students = await getAllStudents();
  return <StudentDashboard initialStudents={students} />;
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Student management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Student Dashboard
          </h1>
        </header>

        <Suspense
          fallback={
            <p className="rounded-lg bg-white px-4 py-8 text-center text-slate-600 shadow-md">
              Loading students...
            </p>
          }
        >
          <DatabaseStudentDashboard />
        </Suspense>
      </div>
    </main>
  );
}
