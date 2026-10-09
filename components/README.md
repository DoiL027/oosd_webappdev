# Components

Reusable parts of the website are stored in this folder.

- **Navigation** (`navigation.js`): Shows the site header and navigation links.
- **StatsCard** (`StatsCard.js`): Displays one student statistic.
- **StudentList** (`StudentList.js`): Displays student cards and handles
  removing students.
- **StudentCard** (`StudentCard.js`): Shows a student's details, photo, and
  remove button.
- **StudentDashboard** (`StudentDashboard.js`): Shows statistics and manages
  the current student list.
- **StudentRegistrationForm** (`StudentRegistrationForm.js`): Collects and
  validates student registration details. It does not save submissions yet.

Student photos belong in the `public/` folder. Use a path like `/65.jpg` when
passing a photo to `StudentCard`.
