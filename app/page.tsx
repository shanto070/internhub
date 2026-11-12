
"use client";

import { useEffect, useState } from "react";

type DashboardStats = {
  totalCourses: number;
  activeProjects: number;
  completedProjects: number;
  totalEnrollments: number;
};

const initialStats: DashboardStats = {
  totalCourses: 0,
  activeProjects: 0,
  completedProjects: 0,
  totalEnrollments: 0,
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        setStats(data.stats);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const statCards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: "📚",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: "💻",
    },
    {
      title: "Completed Projects",
      value: stats.completedProjects,
      icon: "✅",
    },
    {
      title: "Total Enrollments",
      value: stats.totalEnrollments,
      icon: "📊",
    },
  ];

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
        {loading && <p>Loading dashboard statistics...</p>}

        {error && <p className="auth-error">{error}</p>}

        {!loading &&
          !error &&
          statCards.map((stat) => (
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
