export function getStudentStats(studentList) {
  return {
    totalStudents: studentList.length,
    programs: new Set(studentList.map((student) => student.major)).size,
    classYears: new Set(studentList.map((student) => student.year)).size,
    mentors: studentList.filter((student) => student.badge === "Mentor").length,
  };
}
