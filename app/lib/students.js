import pool from "./database";

export async function getAllStudents() {
  const [rows] = await pool.query(`
    SELECT
      CONCAT(first_name, ' ', last_name) AS name,
      photo,
      year,
      program AS major,
      email,
      COALESCE(badge, 'Student') AS badge
    FROM students
    ORDER BY id
  `);

  return rows;
}
