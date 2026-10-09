"use client";

import { useState } from "react";
import StatsCard from "./StatsCard";
import StudentList from "./StudentList";
import { getStudentStats } from "../app/lib/student-stats";

export default function StudentDashboard({ initialStudents }) {
  const [students, setStudents] = useState(initialStudents);
  const stats = getStudentStats(students);

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Programs",
      value: stats.programs,
      icon: "📚",
      color: "bg-green-500",
    },
    {
      title: "Class Years",
      value: stats.classYears,
      icon: "🎓",
      color: "bg-yellow-500",
    },
    {
      title: "Student Mentors",
      value: stats.mentors,
      icon: "🌟",
      color: "bg-purple-500",
    },
  ];

  function removeStudent(email) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.email !== email),
    );
  }

  return (
    <>
      <section
        aria-label="Student statistics"
        className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="rounded-xl bg-white p-5 shadow-md sm:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Student Directory
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Browse the students currently listed in the directory.
          </p>
        </div>
        <StudentList students={students} onRemoveStudent={removeStudent} />
      </section>
    </>
  );
}
