import StudentRegistrationForm from "../../../components/StudentRegistrationForm";

export const metadata = {
  title: "Register a student | Student Management",
  description: "Register a student in the student directory.",
};

export default function NewStudentPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Student directory
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Student registration
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Enter the student&apos;s information below. Fields marked required
            must be completed.
          </p>
        </header>

        <StudentRegistrationForm />
      </div>
    </main>
  );
}
