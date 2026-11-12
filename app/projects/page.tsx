
const projects = [
  {
    title: "InternHub Dashboard",
    description: "A learning management dashboard built with Next.js.",
    technology: "Next.js, TypeScript, CSS",
    status: "In Progress",
  },
  {
    title: "Flight Booking System",
    description: "A full-stack application for managing flight bookings.",
    technology: "NestJS, PostgreSQL, Next.js",
    status: "Completed",
  },
  {
    title: "Smart Task Manager",
    description: "An application to organize and track daily tasks.",
    technology: "React, Node.js",
    status: "In Progress",
  },
  {
    title: "Retail Management System",
    description: "A system for managing products and customer orders.",
    technology: "PHP, MySQL",
    status: "Completed",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <header className="topbar">
        <div>
          <p className="breadcrumb">Workspace / Projects</p>
          <h1>My Projects</h1>
        </div>
      </header>

      <section className="welcome">
        <p>BUILD SOMETHING GREAT!</p>
        <h2>Explore My Projects 💻</h2>
        <p>
          Manage your development projects and track their progress.
        </p>
      </section>

      <section className="content-card">
        <h2>All Projects</h2>
        <p>Here are the projects in your workspace.</p>

        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-tech">
                {project.technology}
              </div>

              <span className="project-status">
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
