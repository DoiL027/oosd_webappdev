import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import StudentList from "../../components/StudentList";
import { getAllStudents } from "../lib/students";

export const metadata = {
  title: "Students | Student Management",
  description: "Browse all students in the student directory.",
};

async function DatabaseStudentList() {
  await connection();
  const students = await getAllStudents();

  return (
    <>
      <p className="mb-5 text-sm text-slate-600">
        {students.length} {students.length === 1 ? "student" : "students"} in
        the directory
      </p>
      <StudentList students={students} />
    </>
  );
}

export default function StudentsPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Student management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Student Directory
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Browse students, their programs, class years, and contact
              information.
            </p>
          </div>
          <Link
            href="/students/new"
            className="inline-flex min-h-10 items-center justify-center self-start rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:self-auto"
          >
            Add student
          </Link>
        </header>

        <section
          aria-label="Students"
          className="rounded-xl bg-white p-5 shadow-md sm:p-6"
        >
          <Suspense
            fallback={
              <p className="rounded-lg bg-slate-50 px-4 py-8 text-center text-slate-600">
                Loading students...
              </p>
            }
          >
            <DatabaseStudentList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
