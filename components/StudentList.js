"use client";

import StudentCard from "./StudentCard";

export default function StudentList({ students, onRemoveStudent }) {
  if (students.length === 0) {
    return (
      <p className="rounded-lg bg-slate-50 px-4 py-8 text-center text-slate-600">
        There are no students in the directory.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <StudentCard
          key={student.email}
          {...student}
          onRemove={
            onRemoveStudent
              ? () => onRemoveStudent(student.email)
              : undefined
          }
        />
      ))}
    </div>
  );
}
