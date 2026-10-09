# App folder

This folder contains the website pages, shared layout, styles, and student
data.

- `page.js`: Home page with student statistics and the student list.
- `layout.js`: Shared page layout and navigation.
- `globals.css`: Website styles.
- `students/new/page.js`: Student registration page.
- `lib/students.js`: Reads student directory records from MySQL.
- `lib/student-stats.js`: Calculates student directory statistics.
- `lib/database.js`: MySQL connection setup.
- I used AI on this part as I really was not sure on how to add the other student I had prior to the sql database
- `../database/import-current-students.sql`: one-time import of the six sample
  students into the `students` table. It allows missing profile fields and adds
  the photo and badge fields used by the sample data. Run it once against the
  configured database.
- `api/weather/route.js`: Gets current weather for a city from OpenWeather.

The homepage displays all students in the MySQL `students` table. The
registration form saves validated student details through a Server Action to
the MySQL `students` table and refreshes the directory. New address records use
Canada as the country because the form accepts Canadian provinces and postal
codes. The form also fetches weather when a city is entered. Set
`API_WEATHER_KEY` in the project-root `.env.local` file to enable weather lookup.
