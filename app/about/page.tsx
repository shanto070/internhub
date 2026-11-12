
const features = [
  {
    icon: "📚",
    title: "Learning Management",
    description: "Track courses and monitor learning progress.",
  },
  {
    icon: "💻",
    title: "Project Management",
    description: "Organize development projects in one place.",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    description: "Quickly find courses and projects.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description: "Keep track of your learning journey.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <header className="topbar">
        <div>
          <p className="breadcrumb">Workspace / About</p>
          <h1>About InternHub</h1>
        </div>
      </header>

      <section className="welcome">
        <p>ABOUT OUR PLATFORM</p>
        <h2>Welcome to InternHub 🚀</h2>
        <p>
          A simple platform designed to manage learning,
          development projects, and personal progress.
        </p>
      </section>

      <section className="content-card about-intro">
        <h2>What is InternHub?</h2>
        <p>
          InternHub is a learning and project management
          dashboard built with Next.js and TypeScript.
          It helps users organize their courses, manage
          projects, search information, and monitor progress
          through a simple and user-friendly interface.
        </p>
      </section>

      <section className="content-card about-features">
        <h2>Our Features</h2>
        <p>Explore the key features available in InternHub.</p>

        <div className="feature-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-footer">
        <h2>Learn. Build. Grow.</h2>
        <p>InternHub v1.0 | Learning Management Platform</p>
      </section>
    </div>
  );
}
