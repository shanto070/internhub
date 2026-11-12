
"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  technology: string;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load projects");
        }

        setProjects(data.projects);
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

    fetchProjects();
  }, []);

  function formatStatus(status: Project["status"]) {
    const statusLabels: Record<Project["status"], string> = {
      PLANNING: "Planning",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      ON_HOLD: "On Hold",
    };

    return statusLabels[status];
  }

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

        {loading && <p>Loading projects...</p>}

        {error && <p className="auth-error">{error}</p>}

        {!loading && !error && projects.length === 0 && (
          <p>No projects available right now.</p>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="project-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-tech">
                  {project.technology}
                </div>

                <span className="project-status">
                  {formatStatus(project.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
