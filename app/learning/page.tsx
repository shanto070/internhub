
const courses = [
  {
    title: "Next.js Fundamentals",
    category: "Frontend Development",
    progress: 75,
    status: "In Progress",
  },
  {
    title: "Python Programming",
    category: "Backend Development",
    progress: 90,
    status: "In Progress",
  },
  {
    title: "Database Management",
    category: "Database",
    progress: 100,
    status: "Completed",
  },
  {
    title: "Git & GitHub",
    category: "Development Tools",
    progress: 60,
    status: "In Progress",
  },
];

export default function LearningPage() {
  return (
    <div>
      <header className="topbar">
        <div>
          <p className="breadcrumb">Workspace / Learning</p>
          <h1>My Learning</h1>
        </div>
      </header>

      <section className="welcome">
        <p>KEEP LEARNING!</p>
        <h2>Grow Your Skills 🚀</h2>
        <p>
          Explore your courses and track your learning progress.
        </p>
      </section>

      <section className="content-card">
        <h2>My Courses</h2>
        <p>Here are the courses you are currently learning.</p>

        <div className="course-list">
          {courses.map((course) => (
            <div className="course-card" key={course.title}>
              <div className="course-header">
                <div>
                  <h3>{course.title}</h3>
                  <p>{course.category}</p>
                </div>

                <span className="course-status">
                  {course.status}
                </span>
              </div>

              <div className="progress-info">
                <span>Progress</span>
                <strong>{course.progress}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
