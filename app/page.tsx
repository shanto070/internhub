
const stats = [
  { title: "Total Courses", value: "08", icon: "📚" },
  { title: "Active Projects", value: "04", icon: "💻" },
  { title: "Completed Tasks", value: "24", icon: "✅" },
  { title: "Learning Hours", value: "36h", icon: "⏱️" },
];

export default function Dashboard() {
  return (
    <div>
      <header className="topbar">
        <div>
          <p className="breadcrumb">Workspace / Dashboard</p>
          <h1>Dashboard</h1>
        </div>

        <div className="profile">
          <span>👨‍💻</span>
          <span>Intern Developer</span>
        </div>
      </header>

      <section className="welcome">
        <p>WELCOME BACK!</p>
        <h2>Welcome to InternHub 👋</h2>
        <p>
          Track your learning progress and manage your
          development projects in one place.
        </p>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <span className="stat-icon">{stat.icon}</span>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </section>

      <section className="content-card">
        <h2>Today's Learning Goals</h2>
        <p>Continue improving your development skills.</p>

        <ul className="goal-list">
          <li>Understand Next.js App Router</li>
          <li>Learn Server and Client Components</li>
          <li>Practice Dynamic Routing</li>
          <li>Build reusable components</li>
        </ul>
      </section>
    </div>
  );
}
